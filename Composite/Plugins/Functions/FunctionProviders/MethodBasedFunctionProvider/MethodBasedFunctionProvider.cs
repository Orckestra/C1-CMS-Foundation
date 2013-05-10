using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Composite.Core.Caching;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.Threading;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Functions.Inline;
using Composite.Functions.Plugins.FunctionProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Plugins.Functions.FunctionProviders.MethodBasedFunctionProvider
{
    [ConfigurationElementType(typeof(MethodBasedFunctionProviderData))]
    internal sealed class MethodBasedFunctionProvider : IFunctionProvider
    {
        FileRelatedDataCache<Type> _inlineFunctionReturnTypeCache = new FileRelatedDataCache<Type>(
            "inlineFuncReturnType",
            (type, filePath) => C1File.WriteAllText(filePath, TypeManager.SerializeType(type)),
            (filePath) => TypeManager.TryGetType(C1File.ReadAllText(filePath))); 

        private FunctionNotifier _functionNotifier;

        public MethodBasedFunctionProvider()
        {
            var events = ChangeEventsSingleton.Instance;

            lock (events.SyncRoot)
            {
                events.DataChangedEvent += OnDataChanged;
                events.FileChangedEvent += CodeFileDirectoryWatcher_Changed;
            }
        }


        public FunctionNotifier FunctionNotifier
        {
            set { _functionNotifier = value; }
        }



        public IEnumerable<IFunction> Functions
        {
            get
            {
                IList<IFunction> result = new List<IFunction>();


                var methodBasedFunctionInfos = DataFacade.GetData<IMethodBasedFunctionInfo>();

                foreach (IMethodBasedFunctionInfo info in methodBasedFunctionInfos)
                {
                    IFunction methodBasedFunction = MethodBasedFunction.Create(info);

                    if (methodBasedFunction == null) continue;

                    result.Add(methodBasedFunction);
                }


                var editableMethodBasedFunctionInfos = DataFacade.GetData<IInlineFunction>();
                    

                foreach (IInlineFunction info in editableMethodBasedFunctionInfos)
                {
                    Type cachedReturnType = GetCachedReturnType(info);

                    IFunction inlineFunction;
                    
                    if (cachedReturnType != null)
                    {
                        inlineFunction = new LazyInitializedInlineFunction(info, cachedReturnType);
                    }
                    else
                    {
                        inlineFunction = InlineFunction.Create(info);

                        if (!(inlineFunction is NotLoadedInlineFunction))
                        {
                            AddReturnTypeToCache(info, inlineFunction.ReturnType);
                        }
                    }

                    result.Add(inlineFunction);
                }

                return result;
            }
        }


        private void AddReturnTypeToCache(IInlineFunction info, Type type)
        {
            string functionName = info.Namespace + "." + info.Name;
            string filePath = info.GetSourceFilePath();

            _inlineFunctionReturnTypeCache.Add(functionName, filePath, type);
        }

        private Type GetCachedReturnType(IInlineFunction info)
        {
            string functionName = info.Namespace + "." + info.Name;
            string filePath = info.GetSourceFilePath();

            Type type;
            if(!_inlineFunctionReturnTypeCache.Get(functionName, filePath, out type))
            {
                return null;
            }

            return type;
        }

        private void OnDataChanged(object sender, EventArgs eventArgs)
        {
            // Checking for null since it is possible that event will be raised before the provider is fully initialized
            if (_functionNotifier != null)
            {
                _functionNotifier.FunctionsUpdated();
            }
        }


        void CodeFileDirectoryWatcher_Changed(object sender, FileSystemEventArgs e)
        {
            // Checking for null since it is possible that event will be raised before the provider is fully initialized
            if (_functionNotifier != null)
            {
                _functionNotifier.FunctionsUpdated();
            }
        }


        private sealed class ChangeEventsSingleton
        {
            public readonly object SyncRoot = new object();
            public event EventHandler DataChangedEvent;
            public event FileSystemEventHandler FileChangedEvent;

            private readonly C1FileSystemWatcher _codeDirectoryFileSystemWatcher;
            private DateTime _lastWriteHandleTime = DateTime.MinValue;
            private object _fileUpdateLock = new object();

            private ChangeEventsSingleton()
            {
                DataEventSystemFacade.SubscribeToStoreChanged<IMethodBasedFunctionInfo>(OnDataChanged, true);
                DataEventSystemFacade.SubscribeToDataDeleted<IInlineFunction>(OnDataChanged, true);
                DataEventSystemFacade.SubscribeToStoreChanged<IInlineFunction>(OnStoreChanged, true);

                string folderToWatch = PathUtil.Resolve(GlobalSettingsFacade.InlineCSharpFunctionDirectory);

                DirectoryUtils.EnsureDirectoryExists(folderToWatch);

                _codeDirectoryFileSystemWatcher = new C1FileSystemWatcher(folderToWatch)
                {
                    NotifyFilter = NotifyFilters.LastWrite,
                    EnableRaisingEvents = true,
                    IncludeSubdirectories = true
                };

                _codeDirectoryFileSystemWatcher.Changed += OnFileWatcherEvent;
            }

            void OnFileWatcherEvent(object sender, FileSystemEventArgs e)
            {
                FileSystemEventHandler hander = FileChangedEvent;
                if (hander != null)
                {
                    lock (_fileUpdateLock)
                    {
                        bool fileExists = true;
                        if (fileExists)
                        {
                            // Supress multiple events fireing by observing last write time
                            DateTime writeTime = C1File.GetLastWriteTime(e.FullPath);
                            if (_lastWriteHandleTime < writeTime)
                            {
                                _lastWriteHandleTime = writeTime;
                                using (ThreadDataManager.EnsureInitialize())
                                {
                                    hander(sender, e);
                                }
                            }
                        }
                    }
                }
            }


            private void OnStoreChanged(object sender, StoreEventArgs storeEventArgs)
            {
                if (!storeEventArgs.DataEventsFired)
                {
                    EventHandler hander = DataChangedEvent;
                    if (hander != null)
                    {
                        hander(sender, storeEventArgs);
                    }
                }
            }


            private void OnDataChanged(object sender, EventArgs eventArgs)
            {
                EventHandler hander = DataChangedEvent;
                if (hander != null)
                {
                    hander(sender, eventArgs);
                }
            }


            public static ChangeEventsSingleton Instance
            {
                get { return Nested.InstanceInt; }
            }

            class Nested
            {

                static Nested()
                {
                    // Explicit static constructor to tell C# compiler
                    // not to mark type as beforefieldinit
                }

                internal static readonly ChangeEventsSingleton InstanceInt = new ChangeEventsSingleton();
            }
        }
    }

    [Assembler(typeof(NonConfigurableFunctionProviderAssembler))]
    internal sealed class MethodBasedFunctionProviderData : FunctionProviderData
    {
    }
}
