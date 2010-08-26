using Composite.C1Console.Events;


namespace Composite.C1Console.Workflow.Foundation
{
    internal static class WorkflowRuntimeProviderRegistry
    {
        private static IWorkflowRuntimeProviderRegistry _implementation = new WorkflowRuntimeProviderRegistryImpl();


        internal static IWorkflowRuntimeProviderRegistry Implementation { get { return _implementation; } set { _implementation = value; } }



        static WorkflowRuntimeProviderRegistry()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static string DefaultWorkflowRuntimeProviderName
        {
            get
            {
                return _implementation.DefaultWorkflowRuntimeProviderName;
            }
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            _implementation.OnFlush();
        }
    }
}