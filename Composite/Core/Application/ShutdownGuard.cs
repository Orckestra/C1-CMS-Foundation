using System;
using System.Reflection;
using System.Web;
using System.Web.Hosting;

namespace Composite.Core.Application
{
    /// <summary>
    /// Postpones raising of shutdown event for ASP.NET
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class ShutdownGuard : IDisposable
    {
        private readonly HttpRuntime _runtime;
        private readonly FieldInfo _shutdownWebEventRaised_FieldInfo;

        private readonly HostingEnvironment _hostingEnvironment;
        private readonly FieldInfo _shutdownInitiated_FieldInfo;

        //private readonly object _fileChangesManager;
        //private readonly FieldInfo _callbackFieldInfo;
        //private readonly FieldInfo _isFCNDisabledFieldInfo;
        //private readonly object _savedCallbackValue;


        /// <exclude />
        public ShutdownGuard()
        {
            if (!HostingEnvironment.IsHosted)
            {
                return;
            }

            const BindingFlags getStaticFieldValue = BindingFlags.NonPublic | BindingFlags.Static | BindingFlags.GetField;
            _runtime = (HttpRuntime)typeof(HttpRuntime).InvokeMember("_theRuntime", getStaticFieldValue, null, null, null);
            _hostingEnvironment = (HostingEnvironment)typeof(HostingEnvironment).InvokeMember("_theHostingEnvironment", getStaticFieldValue, null, null, null);


            const BindingFlags privateField = BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.GetField;
            _shutdownWebEventRaised_FieldInfo = typeof(HttpRuntime).GetField("_shutdownWebEventRaised", privateField);

            // In .NET 3.5 the field is called "_shutdownInitated"
            //    .NET 4.0 the field is called "_shutdownInitiated"
            _shutdownInitiated_FieldInfo = typeof(HostingEnvironment).GetField("_shutdownInitiated", privateField)
                                        ?? typeof(HostingEnvironment).GetField("_shutdownInitated",  privateField);

            // Simulating situation, when all events to unload current AppDomain were already raised.
            _shutdownWebEventRaised_FieldInfo.SetValue(_runtime, true);
            _shutdownInitiated_FieldInfo.SetValue(_hostingEnvironment, true);



            //_fileChangesManager = runtime.GetType().GetField("_fcm", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.GetField).GetValue(runtime);

            //_callbackFieldInfo = _fileChangesManager.GetType().GetField("_callbackRenameOrCriticaldirChange",
            //                                                                    BindingFlags.NonPublic |
            //                                                                    BindingFlags.Instance |
            //                                                                    BindingFlags.GetField);

            //_isFCNDisabledFieldInfo = _fileChangesManager.GetType().GetField("_FCNMode",
            //                                                                    BindingFlags.NonPublic |
            //                                                                    BindingFlags.Instance |
            //                                                                    BindingFlags.GetField);

            //_savedCallbackValue = _callbackFieldInfo.GetValue(_fileChangesManager);
            //_callbackFieldInfo.SetValue(_fileChangesManager, null);

            //// Turning off file change notifications. http://support.microsoft.com/kb/911272
            //_isFCNDisabledFieldInfo.SetValue(_fileChangesManager, (Int32)1);


        }



        /// <exclude />
        public void Dispose()
        {
#if LeakCheck
            GC.SuppressFinalize(this);
#endif
            if (!HostingEnvironment.IsHosted)
            {
                return;
            }

            _shutdownWebEventRaised_FieldInfo.SetValue(_runtime, false);
            _shutdownInitiated_FieldInfo.SetValue(_hostingEnvironment, false);

            //_callbackFieldInfo.SetValue(_fileChangesManager, _savedCallbackValue);
            //_isFCNDisabledFieldInfo.SetValue(_fileChangesManager, (Int32)0);
        }

#if LeakCheck
        private string stack = Environment.StackTrace;
        /// <exclude />
        ~ShutdownGuard()
        {
            Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
        }
#endif

    }
}
