using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;
using System.Security;
using System.Xml;
using System.Xml.Serialization;
using Composite.Core;
using Composite.Core.Application;
using Composite.Core.Application.Plugins.ApplicationStartupHandler;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Types;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.Core.Application
{
    /// <summary>    
    /// Using this attribute on a class with the following two static methods,
    /// will cause C1 to call those two methods in the initialization phase of C1.
    /// This can be used to register event handlers ans such.
    /// The static class should have these two static methods:
    /// <code>
    /// /* This handler will be called before C1 initialization. The data layer cannot be used here. */
    /// public static void OnBeforeInitialize() {}
    /// /* This handler will be called after initialization of C1 core. */
    /// public static void OnInitialized() {}
    /// </code>
    /// </summary>
    /// <example>
    /// <code>
    /// [ApplicationStartup]
    /// public class MyAppStartupHandler
    /// {
    ///     public static void OnBeforeInitialize()
    ///     {
    ///     }
    ///     
    ///     public static void OnInitialized()
    ///     {
    ///     }
    /// } 
    /// </code>
    /// </example>
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
    public sealed class ApplicationStartupAttribute : Attribute
    {
        /// <summary>
        /// If set to <value>True</value>, the exceptions will not be muted and the website will fail to start.
        /// </summary>
        public bool AbortStartupOnException { get; set; }
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
        private class StartupHandlerInfo
        {
            public StartupHandlerInfo(Type type, ApplicationStartupAttribute attribute)
            {
                Type = type;
                Attribute = attribute;
            }

            public Type Type { get; }
            public ApplicationStartupAttribute Attribute { get; }

            public MethodInfo OnBeforeInitialeMethod { get; set; }
            public MethodInfo OnInitializedMethod { get; set; }
        }

        private static readonly string LogTitle = typeof (AttributeBasedApplicationStartupHandler).Name;
        private static readonly string CacheFileName = "StartupHandlersCache.xml";

        private static readonly string OnBeforeInitializeMethodName = "OnBeforeInitialize";
        private static readonly string OnInitializedMethodName = "OnInitialized";

        private readonly List<StartupHandlerInfo> _startupHandlers = new List<StartupHandlerInfo>();

        private static readonly string[] AssembliesToIgnore =
            {
                "Composite.Workflows", 
                "Composite.Generated", 
                "ICSharpCode.SharpZipLib", 
                "TidyNet",
                "System.",
                "Microsoft.",
                "Newtonsoft.Json"
            };
        private static XmlSerializer _xmlSerializer;

        private string _cacheFilePath;


        /// <exclude />
        public AttributeBasedApplicationStartupHandler()
        {
            List<AssemblyInfo> cachedTypesInfo = GetCachedAssemblyInfo();
            bool cacheHasBeenUpdated = false;

            
            foreach(string filePath in AssemblyFacade.GetAssembliesFromBin())
            {
                StartupHandlerInfo[] types = null;
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

        private void Subscribe(StartupHandlerInfo[] startupHandlers)
        {
            foreach (StartupHandlerInfo startupHandler in startupHandlers)
            {
                var type = startupHandler.Type;

                MethodInfo onBeforeInitializeMethod, onInitializedMethod;

                GetPublicStaticMethod(type, OnBeforeInitializeMethodName, out onBeforeInitializeMethod);
                GetPublicStaticMethod(type, OnInitializedMethodName, out onInitializedMethod);

                startupHandler.OnBeforeInitialeMethod = onBeforeInitializeMethod;
                startupHandler.OnInitializedMethod = onInitializedMethod;
                
                _startupHandlers.Add(startupHandler);
            }
        }

        private static void GetPublicStaticMethod(Type type, string methodName, out MethodInfo methodInfo)
        {
            methodInfo = type.GetMethods().FirstOrDefault(m => m.Name == methodName);
            if (methodInfo == null)
            {
                throw new InvalidOperationException(
                    $"The type '{type}' is a missing public static method named '{methodName}'," 
                    + $" taking no arguments or accepting a parameter of type {nameof(IServiceCollection)}");
            }

            if(!methodInfo.IsStatic)
            {
                throw new InvalidOperationException($"Method '{type}' in type '{methodName}' should be static");
            }
        }


        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass", Justification = "This is a temp file, do not go through IO layer")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Composite.IO", "Composite.DoNotUseFileStreamClass:DoNotUseFileStreamClass", Justification = "This is a temp file, do not go through IO layer")]
        private List<AssemblyInfo> GetCachedAssemblyInfo()
        {
            var result = new List<AssemblyInfo>();
            if (!File.Exists(CacheFilePath))
            {
                return result;
            }

            SubscribedTypesCache cached;
            try
            {
                using (var fileStream = File.Open(CacheFilePath, FileMode.Open))
                {
                    cached = GetSerializer().Deserialize(fileStream) as SubscribedTypesCache;
                }
            }
            catch (Exception ex)
            {
                if(ex is IOException || ex is UnauthorizedAccessException)
                {
                    Log.LogWarning(LogTitle, "Failed to open file '{0}'".FormatWith(CacheFilePath));
                    Log.LogError(LogTitle, ex);
                    return result;
                }

                Exception innerEx = ex;
                if(ex is InvalidOperationException && ex.InnerException != null)
                {
                    innerEx = ex.InnerException;
                }

                if(innerEx is XmlException || innerEx is SerializationException)
                {
                    Log.LogWarning(LogTitle, "Failed to deserialize file '{0}'".FormatWith(CacheFilePath));
                    Log.LogError(LogTitle, ex);
                    return result;
                }

                throw;
            }

            if(cached != null 
                && cached.Assemblies != null 
                && cached.Assemblies.Length != 0)
            {
                result.AddRange(cached.Assemblies);
            }

            return result;
        }

        private static StartupHandlerInfo[] GetSubscribedTypes(
            string filePath, List<AssemblyInfo> cachedTypesInfo, ref bool cacheHasBeenUpdated)
        {
            string assemblyName = Path.GetFileNameWithoutExtension(filePath);

            foreach (string assemblyToIgnore in AssembliesToIgnore)
            {
                if (assemblyName == assemblyToIgnore || assemblyName.StartsWith(assemblyToIgnore + ",")
                    || (assemblyToIgnore.EndsWith(".") && assemblyName.StartsWith(assemblyToIgnore)))
                {
                    return null;
                }
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
                        return new StartupHandlerInfo[0];
                    }

                    var asm = Assembly.LoadFrom(filePath);
                    return (from typeName in subscribedTypesNames
                           let type = asm.GetType(typeName)
                           where  type != null
                           let attribute = type.GetCustomAttributes(false)
                                               .OfType<ApplicationStartupAttribute>()
                                               .FirstOrDefault()
                           where attribute != null
                           select new StartupHandlerInfo(type, attribute)).ToArray();
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
                Log.LogWarning(LogTitle, "Failed to load assembly '{0}'".FormatWith(filePath));
                if(ex.LoaderExceptions != null && ex.LoaderExceptions.Length > 0)
                {
                    Log.LogError(LogTitle, ex.LoaderExceptions[0]);
                }

                return null;
            }

            if (!AssemblyFacade.AssemblyPotentiallyUsesType(assembly, typeof (ApplicationStartupAttribute)))
            {
                return null;
            }

            Type[] types;

            if (!TryGetTypes(assembly, out types))
            {
                return new StartupHandlerInfo[0];
            }

            var result = GetSubscribedTypes(types);

            var newCacheEntry = new AssemblyInfo
            {
                AssemblyName = assembly.GetName().Name,
                LastModified = modificationDate,
                SubscribedTypes = result.Select(sh => sh.Type.FullName).ToArray()
            };

            cachedTypesInfo.Add(newCacheEntry);

            cacheHasBeenUpdated = true;

            return result;
        }

        private static StartupHandlerInfo[] GetSubscribedTypes(Type[] types)
        {
            var result = new List<StartupHandlerInfo>();
            foreach (Type type in types)
            {
                try
                {
                    var attribute = type.GetCustomAttributes(false)
                            .OfType<ApplicationStartupAttribute>()
                            .FirstOrDefault();

                    if (attribute != null)
                    {
                        result.Add(new StartupHandlerInfo(type, attribute));
                    }
                }
                catch(SecurityException)
                {
                    // While running under "medium trust" getting attributes may throw SecurityException while getting attributes for some classes
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
                    File.Delete(CacheFilePath);
                }
                else
                {
                    if (!C1Directory.Exists(CacheDirectoryPath))
                    {
                        C1Directory.CreateDirectory(CacheDirectoryPath);
                    }

                    using (var fileStream = File.Open(CacheFilePath, FileMode.Create))
                    {
                        GetSerializer().Serialize(fileStream, root);
                    }
                }
            }
            catch (UnauthorizedAccessException)
            {
                Log.LogWarning(LogTitle, "Failed to open file '{0}'".FormatWith(CacheFilePath));
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
                Log.LogError(LogTitle, new Exception("Failed to load assembly '{0}'".FormatWith(assembly.FullName), exception));
                types = null;
                return false;
            }
            catch(ReflectionTypeLoadException exception)
            {
                var exceptionToLog = exception.LoaderExceptions != null
                    ? exception.LoaderExceptions.First()
                    : exception;
                
                Log.LogError(LogTitle, new Exception("Failed to load assembly '{0}'".FormatWith(assembly.FullName), exceptionToLog));

                types = null;
                return false;
            }
        }


        /// <exclude />
        [Obsolete("Use Composite.Core.Types.AssemblyFacade.IsAppCodeDll(assembly)", true)]
        public static bool IsAppCodeDll(Assembly assembly)
        {
            return AssemblyFacade.IsAppCodeDll(assembly);
        }


        private object[] GetParameters(MethodInfo methodInfo)
        {
            var parameters = methodInfo.GetParameters();
            if (parameters.Length == 0)
            {
                return null;
            }

            if (parameters.Length == 1 && parameters[0].ParameterType == typeof (IServiceCollection))
            {
                return new object[] { ServiceLocator.ServiceCollection };
            }

            throw new InvalidOperationException("Application startup does not support the specified method signature on method '{0}' of type '{1}'"
                .FormatWith(methodInfo.Name, methodInfo.DeclaringType.FullName));
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


        private static string CacheDirectoryPath
        {
            get
            {
                return PathUtil.Resolve(GlobalSettingsFacade.CacheDirectory);
            }
        }


        private string CacheFilePath
        {
            get
            {
                if (_cacheFilePath == null)
                {
                    _cacheFilePath = Path.Combine(CacheDirectoryPath, CacheFileName);
                }
                
                return _cacheFilePath;
            }
        }


        /// <exclude />
        public void OnBeforeInitialize()
        {
            foreach (var startupHandler in _startupHandlers)
            {
                var methodInfo = startupHandler.OnBeforeInitialeMethod;
                methodInfo.Invoke(null, GetParameters(methodInfo));
            }
        }


        /// <exclude />
        public void OnInitialized()
        {
            foreach (var startupHandler in _startupHandlers)
            {
                MethodInfo methodInfo = startupHandler.OnInitializedMethod;

                try
                {
                    methodInfo.Invoke(null, GetParameters(methodInfo));
                }
                catch (TargetInvocationException ex)
                {
                    if (startupHandler.Attribute.AbortStartupOnException)
                    {
                        throw;
                    }

                    Log.LogError(LogTitle, "Failed to execute startup handler. Type: '{0}', Assembly: '{1}'",
                                           methodInfo.DeclaringType.FullName, methodInfo.DeclaringType.Assembly.FullName);

                    Log.LogError(LogTitle, ex.InnerException);
                }
            }
        }

        

        private static void LogAssemblyLoadException(string filePath, Exception e)
        {
            var logEx = new InvalidOperationException("Failed to load types from file '{0}'".FormatWith(filePath), e);
            Log.LogError(LogTitle, logEx);

            Exception toExamine = e;
            while (toExamine != null)
            {
                ReflectionTypeLoadException reflectionTypeLoadException = toExamine as ReflectionTypeLoadException;
                if (reflectionTypeLoadException != null)
                {
                    Exception[] loaderExceptions = reflectionTypeLoadException.LoaderExceptions;
                    foreach (Exception loaderException in loaderExceptions)
                    {
                        Log.LogError(LogTitle + " | LOADEREXCEPTION", loaderException.Message);
                    }
                }

                toExamine = toExamine.InnerException;
            }
        }



        /// <exclude />
        [Serializable]
        public class SubscribedTypesCache
        {
            /// <exclude />
            public AssemblyInfo[] Assemblies { get; set; }
        }



        /// <exclude />
        [Serializable]
        public class AssemblyInfo
        {
            /// <exclude />
            public string AssemblyName { get; set; }            // Assembly name

            /// <exclude />
            public DateTime LastModified { get; set; }

            /// <exclude />
            public string[] SubscribedTypes; 
        }
    }
}
