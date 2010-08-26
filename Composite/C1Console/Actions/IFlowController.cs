namespace Composite.C1Console.Actions
{
    internal interface IFlowController
    {
        /// <summary>
        /// Set by the the system (mediator)
        /// </summary>
        FlowControllerServicesContainer ServicesContainer { set; }

        IFlowUiDefinition GetCurrentUiDefinition(FlowToken flowToken);
        void CancelFlow(FlowToken flowToken);
    }
}
