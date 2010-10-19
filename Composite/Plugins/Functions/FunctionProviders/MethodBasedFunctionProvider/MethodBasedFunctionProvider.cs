using System.Collections.Generic;
using System.Linq;
using Composite.Data;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Functions.Inline;
using Composite.Functions.Plugins.FunctionProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using System.IO;
using Composite.Core.IO;
using Composite.Core.Configuration;
using Composite.Core.Threading;
using System;


namespace Composite.Plugins.Functions.FunctionProviders.MethodBasedFunctionProvider
{
    [ConfigurationElementType(typeof(MethodBasedFunctionProviderData))]
    internal sealed class MethodBasedFunctionProvider : IFunctionProvider
    {
        private FunctionNotifier _functionNotifier;
        private FileSystemWatcher _codeDirectoryFileSystemWatcher;
        private DateTime _lastWriteHandleTime = DateTime.MinValue;
        private object _fileUpdateLock = new object();




        public MethodBasedFunctionProvider()
        {
            DataEventSystemFacade.SubscribeToDataAfterAdd<IMethodBasedFunctionInfo>(OnDataChanged);
            DataEventSystemFacade.SubscribeToDataDeleted<IMethodBasedFunctionInfo>(OnDataChanged);
            DataEventSystemFacade.SubscribeToDataAfterUpdate<IMethodBasedFunctionInfo>(OnDataChanged);

            _codeDirectoryFileSystemWatcher = new System.IO.FileSystemWatcher(PathUtil.Resolve(GlobalSettingsFacade.InlineCSharpFunctionDirectory));
            _codeDirectoryFileSystemWatcher.Changed += new System.IO.FileSystemEventHandler(CodeFileDirectoryWatcher_Changed);
            _codeDirectoryFileSystemWatcher.NotifyFilter = NotifyFilters.LastWrite;
            _codeDirectoryFileSystemWatcher.EnableRaisingEvents = true;
            _codeDirectoryFileSystemWatcher.IncludeSubdirectories = true;

            DataEventSystemFacade.SubscribeToDataDeleted<IInlineFunction>(OnDataChanged);
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
            _functionNotifier.FunctionsUpdated();
        }


        void CodeFileDirectoryWatcher_Changed(object sender, FileSystemEventArgs e)
        {
            lock (_fileUpdateLock)
            {
                using (ThreadDataManager.EnsureInitialize())
                {
                    bool fileExists = true;
                    if (fileExists)
                    {
                        // Supress multiple events fireing by observing last write time
                        DateTime writeTime = File.GetLastWriteTime(e.FullPath);
                        if (_lastWriteHandleTime < writeTime)
                        {
                            _lastWriteHandleTime = writeTime;
                            _functionNotifier.FunctionsUpdated();
                        }

                    }
                }
            }
        }




    }




    [Assembler(typeof(NonConfigurableFunctionProviderAssembler))]
    internal sealed class MethodBasedFunctionProviderData : FunctionProviderData
    {
    }
}
