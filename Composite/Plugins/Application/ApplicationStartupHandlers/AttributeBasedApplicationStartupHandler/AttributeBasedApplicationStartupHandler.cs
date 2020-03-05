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
using Composite.Core.IO;
using Composite.Core.Types;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.Core.Application
{
    /// <summary>    
    /// Using this attribute on a class will cause the CMS to call methods on it at startup. 
    /// The following methods will be called, if they exist:
    /// 
    /// <code>
    /// /* This handler will be called first, before C1 initialization, and allow you to register services exposed by <see cref="Composite.Core.ServiceLocator"/>
    /// public void ConfigureServices(<see cref="Microsoft.Extensions.DependencyInjection.IServiceCollection"/> serviceCollection) {}
    /// /* This handler will be called before C1 initialization. The data layer cannot be used here. */
    /// public void OnBeforeInitialize() {}
    /// /* This handler will be called after initialization of C1 core. */
    /// public void OnInitialized() {}
    /// </code>
    /// </summary>
    /// <example>
    /// To register a service on <see cref="Composite.Core.ServiceLocator"/>:
    /// <code>
    /// [ApplicationStartup]
    /// public class MyServiceRegistration
    /// {
    ///     public void ConfigureServices(IServiceCollection serviceCollection)
    ///     {
    ///         // Register a singleton service that will be retrievable via Composite.Core.ServiceLocator
    ///         serviceCollection.AddSingleton(typeof(ITestStuff), typeof(TestStuff));
    ///     }
    /// } 
    /// </code>
    /// 
    /// If OnBeforeInitialize() or OnInitialized() has any parameters, they will be provided via the ServiceLocator.
    /// 
    /// <code>
    /// [ApplicationStartup]
    /// public class MyAppStartupHandler
    /// {
    ///     public void OnBeforeInitialize()
    ///     {
    ///     }
    ///     
    ///     public void OnInitialized(Composite.Core.Logging.ILog log)
    ///     {
    ///         log.LogInformation("Dependency Injection supported here");
    ///     }
    /// } 
    /// </code>
    /// </example>
    /// <notes>
    /// Class and method can be static, but do not need to be. 
    /// </notes>
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
        /// <exclude />
        public void ConfigureServices(IServiceCollection serviceCollection)
        {
            var serviceCollectionParameter = new object[] { serviceCollection };
            foreach (var startupHandler in _startupHandlers)
            {
                var methodInfo = startupHandler.ConfigureServicesMethod;

                try
                {
                    if (methodInfo != null)
                    {
                        if (methodInfo.IsStatic)
                        {
                            methodInfo.Invoke(null, serviceCollectionParameter);
                        }
                        else
                        {
                            var instance = Activator.CreateInstance(methodInfo.DeclaringType);
                            methodInfo.Invoke(instance, serviceCollectionParameter);
                        }
                    }
                }
                catch (Exception ex)
                {
                    ProcessHandlerException(startupHandler, methodInfo, ex);
                }
            }
        }


        /// <exclude />
        public void OnBeforeInitialize(IServiceProvider serviceProvider)
        {
            ExecuteEventHandlers(serviceProvider, handler => handler.OnBeforeInitializeMethod);
        }


        /// <exclude />
        public void OnInitialized(IServiceProvider serviceProvider)
        {
            ExecuteEventHandlers(serviceProvider, handler => handler.OnInitializedMethod);
        }


        private class StartupHandlerInfo
        {
            public StartupHandlerInfo(Type type, ApplicationStartupAttribute attribute)
            {
                Type = type;
                Attribute = attribute;
            }

            public Type Type { get; }
            public ApplicationStartupAttribute Attribute { get; }

            public MethodInfo OnBeforeInitializeMethod { get; set; }
            public MethodInfo OnInitializedMethod { get; set; }
            public MethodInfo ConfigureServicesMethod { get; set; }
        }

        private static readonly string LogTitle = typeof (AttributeBasedApplicationStartupHandler).Name;
        private static readonly string CacheFileName = "StartupHandlersCache.xml";

        private static readonly string OnBeforeInitializeMethodName = nameof(IApplicationStartupHandler.OnBeforeInitialize);
        private static readonly string OnInitializedMethodName = nameof(IApplicationStartupHandler.OnInitialized);
        private static readonly string ConfigureServicesMethodName = nameof(IApplicationStartupHandler.ConfigureServices);

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

                var methods = type.GetMethods();

                startupHandler.ConfigureServicesMethod = methods.FirstOrDefault(m => m.Name == ConfigureServicesMethodName && m.GetParameters().Length == 1 && m.GetParameters()[0].ParameterType == typeof(IServiceCollection));
                startupHandler.OnBeforeInitializeMethod = methods.FirstOrDefault(m => m.Name == OnBeforeInitializeMethodName);
                startupHandler.OnInitializedMethod = methods.FirstOrDefault(m => m.Name == OnInitializedMethodName);

                _startupHandlers.Add(startupHandler);
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
                    Log.LogWarning(LogTitle, $"Failed to open file '{CacheFilePath}'");
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
                    Log.LogWarning(LogTitle, $"Failed to deserialize file '{CacheFilePath}'");
                    Log.LogError(LogTitle, ex);
                    return result;
                }

                throw;
            }

            if (cached?.Assemblies != null && cached.Assemblies.Length != 0)
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
                Log.LogWarning(LogTitle, $"Failed to load assembly '{filePath}'");
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
            catch (Exception)
            {
                Log.LogWarning(LogTitle, $"Failed to open file '{CacheFilePath}' for writing - this may lead to slower start up times, if this issue persist. In that case, check that this file is accessible to the web application for writes.");
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
                Log.LogError(LogTitle, new Exception($"Failed to load assembly '{assembly.FullName}'", exception));
                types = null;
                return false;
            }
            catch(ReflectionTypeLoadException exception)
            {
                var exceptionToLog = exception.LoaderExceptions != null
                    ? exception.LoaderExceptions.First()
                    : exception;
                
                Log.LogError(LogTitle, new Exception($"Failed to load assembly '{assembly.FullName}'", exceptionToLog));

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


        private static XmlSerializer GetSerializer()
        {
            // NOTE: Performance critical to have serializer inside Composite.Core.XmlSerializers.dll
            if (_xmlSerializer == null)
            {
                _xmlSerializer = new XmlSerializer(typeof(SubscribedTypesCache), new [] {typeof(AssemblyInfo)});
            }

            return _xmlSerializer;
        }


        private static string CacheDirectoryPath => PathUtil.Resolve(GlobalSettingsFacade.CacheDirectory);


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


        private void ExecuteEventHandlers(IServiceProvider serviceProvider, Func<StartupHandlerInfo,MethodInfo> methodLocator)
        {
            foreach (var startupHandler in _startupHandlers.Where(h => methodLocator(h) != null))
            {
                MethodInfo methodInfo = methodLocator(startupHandler);

                try
                {
                    InvokeWithServices(serviceProvider, methodInfo);
                }
                catch (Exception ex)
                {
                    ProcessHandlerException(startupHandler, methodInfo, ex);
                }
            }
        }

        private void ProcessHandlerException(StartupHandlerInfo startupHandler, MethodInfo methodInfo, Exception ex)
        {
            var type = methodInfo.DeclaringType;
            var message = $"Failed to execute startup handler. Type: '{type.FullName}', Assembly: '{type.Assembly.FullName}'";

            if (startupHandler.Attribute.AbortStartupOnException)
            {
                throw new InvalidOperationException(message, ex);
            }

            Log.LogError(LogTitle, message);

            Log.LogError(LogTitle, ex is TargetInvocationException ? ex.InnerException : ex);
        }


        private static void InvokeWithServices(IServiceProvider serviceProvider, MethodInfo methodInfo)
        {
            object[] methodArguments = methodInfo.GetParameters().Select(p => serviceProvider.GetRequiredService(p.ParameterType)).ToArray();
            object methodClass = methodInfo.IsStatic ? null : ActivatorUtilities.GetServiceOrCreateInstance(serviceProvider, methodInfo.DeclaringType);

            methodInfo.Invoke(methodClass, methodArguments);
        }


        private static void LogAssemblyLoadException(string filePath, Exception e)
        {
            var logEx = new InvalidOperationException($"Failed to load types from file '{filePath}'", e);
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
            public string AssemblyName { get; set; }

            /// <exclude />
            public DateTime LastModified { get; set; }

            /// <exclude />
            public string[] SubscribedTypes; 
        }
    }
}
