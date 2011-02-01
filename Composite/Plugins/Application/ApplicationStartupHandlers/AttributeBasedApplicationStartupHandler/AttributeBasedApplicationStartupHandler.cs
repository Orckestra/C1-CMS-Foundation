using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;
using System.Web.Hosting;
using System.Xml;
using System.Xml.Serialization;
using Composite.Core.Application;
using Composite.Core.Application.Plugins.ApplicationStartupHandler;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Logging;
using Composite.Core.Types;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Core.Application
{
    /// <summary>
    /// Use the attribute on a static class with the following two static methods:
    /// public static void OnBeforeInitialize() {}
    /// public static void OnInitialized() {}
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
    public sealed class ApplicationStartupAttribute : Attribute
    {        
    }
}


namespace Composite.Plugins.Application.ApplicationStartupHandlers.AttributeBasedApplicationStartupHandler
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [ConfigurationElementType(typeof(NonConfigurableApplicationStartupHandler))]
    public sealed class AttributeBasedApplicationStartupHandler : IApplicationStartupHandler
    {
        private static readonly string TempFileName = "StartupHandlersCache.xml";

        private List<MethodInfo> _onBeforeInitializeMethods = new List<MethodInfo>();
        private List<MethodInfo> _onInitializedMethods = new List<MethodInfo>();
        // private string[] AssembliesToIgnore = new[] { "Microsoft.Practices.", "Composite,", "ICSharpCode.SharpZipLib,", "TidyNet," };
        private static XmlSerializer _xmlSerializer;

        private string _tempFilePath;

        public AttributeBasedApplicationStartupHandler()
        {
            List<AssemblyInfo> cachedTypesInfo = GetCachedAssemblyInfo();
            bool cacheHasBeenUpdated = false;

            // Getting list of assemblies from "/bin" folder
            string[] dllsFromBin = GetDllFilesFromBin();

            foreach(string filePath in dllsFromBin)
            {
                Type[] types = null;
                try
                {
                    types = GetSubscribedTypes(filePath, cachedTypesInfo, ref cacheHasBeenUpdated);
                }
                catch (Exception e)
                {
                    LogAssemblyLoadException(filePath, e);
                }

                if(types != null)
                {
                    Subscribe(types);
                }
            }

            Assembly appCodeAsm = AssemblyFacade.GetAppCodeAssembly();
            if (appCodeAsm != null)
            {
                Subscribe(GetSubscribedTypes(appCodeAsm.GetTypes()));
            }

            if (cacheHasBeenUpdated)
            {
                SaveTypesCache(cachedTypesInfo);
            }
        }



        private void Subscribe(Type[] types)
        {
            foreach (Type type in types)
            {
                MethodInfo onBeforeInitializeMethod = type.GetMethod("OnBeforeInitialize", BindingFlags.Public | BindingFlags.Static);
                if (onBeforeInitializeMethod == null)
                {
                    LoggingService.LogWarning("AttributeBasedApplicationStartupHandler", string.Format("The type '{0}' is missing public static methods named 'OnBeforeInitialize' and 'OnInitialized' taking no arguments", type));
                    continue;
                }


                MethodInfo onInitializedMethod = type.GetMethod("OnInitialized", BindingFlags.Public | BindingFlags.Static);
                if (onInitializedMethod == null)
                {
                    LoggingService.LogWarning("AttributeBasedApplicationStartupHandler", string.Format("The type '{0}' is missing public static methods named 'OnBeforeInitialize' and 'OnInitialized' taking no arguments", type));
                    continue;
                }

                _onBeforeInitializeMethods.Add(onBeforeInitializeMethod);
                _onInitializedMethods.Add(onInitializedMethod);
            }
        }

        private string[] GetDllFilesFromBin()
        {
            string binDirectory = PathUtil.Resolve(GlobalSettingsFacade.BinDirectory).ToLower().Replace('/', '\\');
            return C1Directory.GetFiles(binDirectory, "*.dll");
        }


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is a temp file, do not go through IO layer")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass", Justification = "This is a temp file, do not go through IO layer")]
        private List<AssemblyInfo> GetCachedAssemblyInfo()
        {
            var result = new List<AssemblyInfo>();
            if (!File.Exists(TempFilePath))
            {
                return result;
            }

            SubscribedTypesCache cached;
            try
            {
                using (var fileStream = File.Open(TempFilePath, FileMode.Open))
                {
                    cached = GetSerializer().Deserialize(fileStream) as SubscribedTypesCache;
                }
            }
            catch (IOException)
            {
                LoggingService.LogWarning(typeof(AttributeBasedApplicationStartupHandler).FullName, "Failed to open file '{0}'".FormatWith(TempFilePath));
                return result;
            }
            catch (UnauthorizedAccessException)
            {
                LoggingService.LogWarning(typeof(AttributeBasedApplicationStartupHandler).FullName, "Failed to open file '{0}'".FormatWith(TempFilePath));
                return result;
            }
            catch (XmlException)
            {
                LoggingService.LogWarning(typeof(AttributeBasedApplicationStartupHandler).FullName, "Failed to deserialize file '{0}'".FormatWith(TempFilePath));
                return result;
            }
            catch(SerializationException)
            {
                LoggingService.LogWarning(typeof(AttributeBasedApplicationStartupHandler).FullName, "Failed to deserialize file '{0}'".FormatWith(TempFilePath));
                return result;
            }

            if(cached != null 
                && cached.Assemblies != null 
                && cached.Assemblies.Length != 0)
            {
                result.AddRange(cached.Assemblies);
            }

            return result;
        }

        private static Type[] GetSubscribedTypes(string filePath, List<AssemblyInfo> cachedTypesInfo, ref bool cacheHasBeenUpdated)
        {
            string assemblyName = Path.GetFileNameWithoutExtension(filePath);
            if(assemblyName == "Composite.Generated")
            {
                return null;
            }

            DateTime modificationDate = C1File.GetLastWriteTime(filePath);

            var cachedInfo = cachedTypesInfo.FirstOrDefault(asm => asm.AssemblyName == assemblyName);
            if (cachedInfo != null)
            {
                if (cachedInfo.LastModified == modificationDate)
                {
                    string[] subscribedTypesNames = cachedInfo.SubscribedTypes;
                    if(subscribedTypesNames.Length == 0)
                    {
                        return new Type[0];
                    }

                    Assembly asm = Assembly.LoadFrom(filePath);
                    return subscribedTypesNames.Select(asm.GetType).ToArray();
                }

                // Removing cache entry if it is obsolete
                cachedTypesInfo.Remove(cachedInfo);
            }

            Assembly assembly;
            try
            {
                assembly = Assembly.LoadFrom(filePath);
            }
            catch (ReflectionTypeLoadException ex)
            {
                LoggingService.LogWarning(typeof(AttributeBasedApplicationStartupHandler).Name, "Failed to load assebmly '{0}'".FormatWith(filePath));
                if(ex.LoaderExceptions != null && ex.LoaderExceptions.Length > 0)
                {
                    LoggingService.LogError(typeof(AttributeBasedApplicationStartupHandler).Name, ex.LoaderExceptions[0]);
                }

                return null;
            }
            

            Type[] types;

            if (!TryGetTypes(assembly, out types))
            {
                return new Type[0];
            }

            Type[] result = GetSubscribedTypes(types);

            var newCacheEntry = new AssemblyInfo
            {
                AssemblyName = assembly.GetName().Name,
                LastModified = modificationDate,
                SubscribedTypes = result.Select(type => type.FullName).ToArray()
            };

            cachedTypesInfo.Add(newCacheEntry);

            cacheHasBeenUpdated = true;

            return result;
        }

        private static Type[] GetSubscribedTypes(Type[] types)
        {
            List<Type> result = new List<Type>();
            foreach (Type type in types)
            {
                bool hasAttribute = type.GetCustomAttributes(false).Where(f => f.GetType() == typeof(ApplicationStartupAttribute)).Any();

                if (hasAttribute)
                {
                    result.Add(type);
                }
            }
            return result.ToArray();
        }


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is a temp file, do not go through IO layer")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass", Justification = "This is a temp file, do not go through IO layer")]
        private void SaveTypesCache(List<AssemblyInfo> cachedTypesInfo)
        {
            SubscribedTypesCache root = null;

            if(cachedTypesInfo.Count > 0)
            {
                root = new SubscribedTypesCache {Assemblies = cachedTypesInfo.ToArray()};
            }

            try
            {
                if(root == null)
                {
                    File.Delete(TempFilePath);
                }
                else
                {
                    if (!C1Directory.Exists(TempDirectoryPath))
                    {
                        C1Directory.CreateDirectory(TempDirectoryPath);
                    }

                    using (var fileStream = File.Open(TempFilePath, FileMode.Create))
                    {
                        GetSerializer().Serialize(fileStream, root);
                    }
                }
            }
            catch (UnauthorizedAccessException)
            {
                LoggingService.LogWarning(typeof(AttributeBasedApplicationStartupHandler).FullName, "Failed to open file '{0}'".FormatWith(TempFilePath));
            }
        }

        [DebuggerStepThrough]
        private static bool TryGetTypes(Assembly assembly, out Type[] types)
        {
            try
            {
                types = assembly.GetTypes();
                return true;
            }
            catch (TypeLoadException exception)
            {
                LoggingService.LogError(typeof(AttributeBasedApplicationStartupHandler).Name, 
                    new Exception("Failed to load assebmly '{0}'".FormatWith(assembly.FullName), exception));
                types = null;
                return false;
            }
        }

        [Obsolete("Use Composite.Core.Types.AsseblyFacade.IsAppCodeDll(assembly)")]
        public static bool IsAppCodeDll(Assembly assembly)
        {
            return AssemblyFacade.IsAppCodeDll(assembly);
        }

        public void OnBeforeInitialize()
        {
            foreach (MethodInfo methodInfo in _onBeforeInitializeMethods)
            {
                methodInfo.Invoke(null, null);
            }
        }


        private static XmlSerializer GetSerializer()
        {
            // NOTE: Performance critical to have serializer inside Composite.Core.XmlSerializers.dll
            if (_xmlSerializer == null)
            {
                _xmlSerializer = new XmlSerializer(typeof(SubscribedTypesCache), new [] {typeof(AssemblyInfo)});
            }

            return _xmlSerializer;
        }


        private static string TempDirectoryPath
        {
            get
            {
                return HostingEnvironment.MapPath(GlobalSettingsFacade.TempDirectory);
            }
        }

        private string TempFilePath
        {
            get
            {
                if (_tempFilePath == null)
                {
                    _tempFilePath = Path.Combine(TempDirectoryPath, TempFileName);
                }
                
                return _tempFilePath;
            }
        }


        public void OnInitialized()
        {
            foreach (MethodInfo methodInfo in _onInitializedMethods)
            {
                methodInfo.Invoke(null, null);
            }
        }

        

        private static void LogAssemblyLoadException(string filePath, Exception e)
        {
            var logEx = new InvalidOperationException("Failed to load types from file '{0}'".FormatWith(filePath), e);
            LoggingService.LogError(typeof(AttributeBasedApplicationStartupHandler).Name, logEx);

            Exception toExamine = e;
            while (toExamine != null)
            {
                ReflectionTypeLoadException reflectionTypeLoadException = toExamine as ReflectionTypeLoadException;
                if (reflectionTypeLoadException != null)
                {
                    Exception[] loaderExceptions = reflectionTypeLoadException.LoaderExceptions;
                    foreach (Exception loaderException in loaderExceptions)
                    {
                        LoggingService.LogError(typeof(AttributeBasedApplicationStartupHandler).Name + " | LOADEREXCEPTION", loaderException.Message);
                    }
                }

                toExamine = toExamine.InnerException;
            }
        }



        [Serializable]
        public class SubscribedTypesCache
        {
            public AssemblyInfo[] Assemblies { get; set; }
        }

        [Serializable]
        public class AssemblyInfo
        {
            public string AssemblyName { get; set; }            // Assembly name
            public DateTime LastModified { get; set; }
            public string[] SubscribedTypes;
        }
    }
}
