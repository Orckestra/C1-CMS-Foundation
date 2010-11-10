using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.Threading;
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


                IEnumerable<IMethodBasedFunctionInfo> methodBasedFunctionInfos =
                    from item in DataFacade.GetData<IMethodBasedFunctionInfo>()
                    select item;

                foreach (IMethodBasedFunctionInfo info in methodBasedFunctionInfos)
                {
                    MethodBasedFunction methodBasedFunction = MethodBasedFunction.Create(info);

                    if (methodBasedFunction == null) continue;

                    result.Add(methodBasedFunction);
                }


                IEnumerable<IInlineFunction> editableMethodBasedFunctionInfos =
                    from item in DataFacade.GetData<IInlineFunction>()
                    select item;

                foreach (IInlineFunction info in editableMethodBasedFunctionInfos)
                {
                    InlineFunction inlineFunction = InlineFunction.Create(info);

                    if (inlineFunction == null) continue;

                    result.Add(inlineFunction);
                }

                return result;
            }
        }



        private void OnDataChanged(object sender, DataEventArgs dataEventArgs)
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
            public event DataEventHandler DataChangedEvent;
            public event FileSystemEventHandler FileChangedEvent;

            private readonly Composite.Core.IO.FileSystemWatcher _codeDirectoryFileSystemWatcher;
            private DateTime _lastWriteHandleTime = DateTime.MinValue;
            private object _fileUpdateLock = new object();

            private ChangeEventsSingleton()
            {
                DataEventSystemFacade.SubscribeToDataAfterAdd<IMethodBasedFunctionInfo>(OnDataChanged);
                DataEventSystemFacade.SubscribeToDataDeleted<IMethodBasedFunctionInfo>(OnDataChanged);
                DataEventSystemFacade.SubscribeToDataAfterUpdate<IMethodBasedFunctionInfo>(OnDataChanged);

                DataEventSystemFacade.SubscribeToDataDeleted<IInlineFunction>(OnDataChanged);

                string folderToWatch = PathUtil.Resolve(GlobalSettingsFacade.InlineCSharpFunctionDirectory);

                DirectoryUtil.EnsureDirectoryExists(folderToWatch);

                _codeDirectoryFileSystemWatcher = new Composite.Core.IO.FileSystemWatcher(folderToWatch)
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

            private void OnDataChanged(object sender, DataEventArgs dataEventArgs)
            {
                DataEventHandler hander = DataChangedEvent;
                if (hander != null)
                {
                    hander(sender, dataEventArgs);
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
