using System.Workflow.Runtime;
using Composite.C1Console.Events;


namespace Composite.C1Console.Workflow.Foundation.PluginFacades
{
    internal static class WorkflowRuntimeProviderPluginFacade
    {
        private static IWorkflowRuntimeProviderPluginFacade _implementation = new WorkflowRuntimeProviderPluginFacadeImpl();


        internal static IWorkflowRuntimeProviderPluginFacade Implementation { get { return _implementation; } set { _implementation = value; } }



        static WorkflowRuntimeProviderPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }


        public static bool HasConfiguration
        {
            get
            {
                return _implementation.HasConfiguration;
            }
        }



        public static WorkflowRuntime GetWorkflowRuntime(string providerName)
        {
            return _implementation.GetWorkflowRuntime(providerName);
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            _implementation.OnFlush();
        }
    }
}
