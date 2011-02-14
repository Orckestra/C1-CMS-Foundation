using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Runtime;
using Composite.C1Console.Actions.Foundation;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.Configuration;
using Composite.Core.Logging;
using Composite.C1Console.Security;
using Composite.C1Console.Users;
using Composite.C1Console.Workflow;


namespace Composite.C1Console.Actions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class FlowControllerFacade
    {
        private static TimeSpan? _timeout = null;
        private static bool _initialized = false;
        private static object _lock = new object();



        /// <exclude />
        public static void Initialize()
        {
            lock (_lock)
            {
                if (_initialized == false)
                {
                    WorkflowInstance workflowInstance = WorkflowFacade.CreateNewWorkflow(WorkflowFacade.GetWorkflowType("Composite.C1Console.Actions.Workflows.FlowInformationScavengerWorkflow"));
                    workflowInstance.Start();
                    WorkflowFacade.RunWorkflow(workflowInstance);

                    LoggingService.LogVerbose("FlowControllerFacade", "Flow scavenger started");

                    _initialized = true;
                }
            }
        }



        /// <exclude />
        public static IFlowUiDefinition GetCurrentUiDefinition(FlowToken flowToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            if (flowToken == null) throw new ArgumentNullException("flowToken");

            IFlowController flowExecutor = FlowControllerCache.GetFlowController(flowToken, flowControllerServicesContainer);

            IFlowUiDefinition flowResult = flowExecutor.GetCurrentUiDefinition(flowToken);

            if (flowResult == null)
            {
                flowResult = new NullFlowUiDefinition();
            }

            return flowResult;
        }



        /// <exclude />
        public static void CancelFlow(FlowToken flowToken)
        {
            if (flowToken == null) throw new ArgumentNullException("flowToken");

            IFlowController flowExecutor = FlowControllerCache.GetFlowController(flowToken, new FlowControllerServicesContainer());

            flowExecutor.CancelFlow(flowToken);
        }



        /// <exclude />
        public static void CancelFlowsByConsoleId(string consoleId)
        {
            List<string> serializedFlowTokens =
                (from f in DataFacade.GetData<IFlowInformation>()
                 where f.ConsoleId == consoleId
                 select f.SerializedFlowToken).ToList();

            foreach (string serializedFlowToken in serializedFlowTokens)
            {
                FlowToken flowToken = FlowTokenSerializer.Deserialize(serializedFlowToken);

                CancelFlow(flowToken);
            }
        }



        /// <exclude />
        public static IEnumerable<FlowToken> GetFlowTokensByUsername(string username)
        {
            List<string> serializedFlowTokens =
                (from f in DataFacade.GetData<IFlowInformation>()
                 where f.Username == username
                 select f.SerializedFlowToken).ToList();

            foreach (string serializedFlowToken in serializedFlowTokens)
            {
                FlowToken flowToken = FlowTokenSerializer.Deserialize(serializedFlowToken);

                yield return flowToken;
            }
        }



        /// <exclude />
        public static IEnumerable<string> GetConsoleIdsByUsername(string username)
        {
            List<string> consoleIds =
                (from f in DataFacade.GetData<IFlowInformation>()
                 where f.Username == username
                 select f.ConsoleId).ToList();

            return consoleIds;
        }



        /// <exclude />
        public static void FlowComplete(FlowToken flowToken)
        {
            UnregisterFlowInformation(flowToken);
        }



        internal static void RegisterNewFlowInformation(FlowToken flowToken, EntityToken entityToken, ActionToken actionToken, string consoleId)
        {
            IFlowInformation flowInformation = DataFacade.BuildNew<IFlowInformation>();
            flowInformation.Id = Guid.NewGuid();
            flowInformation.Username = UserSettings.Username;
            flowInformation.ConsoleId = consoleId;
            flowInformation.SerializedFlowToken = FlowTokenSerializer.Serialize(flowToken);
            flowInformation.SerializedEntityToken = EntityTokenSerializer.Serialize(entityToken);
            flowInformation.SerializedActionToken = ActionTokenSerializer.Serialize(actionToken);
            flowInformation.TimeStamp = DateTime.Now;

            DataFacade.AddNew<IFlowInformation>(flowInformation);
        }



        internal static void UnregisterFlowInformation(FlowToken flowToken)
        {
            string serializedFlowToken = FlowTokenSerializer.Serialize(flowToken);

            DataFacade.Delete<IFlowInformation>(f => f.SerializedFlowToken == serializedFlowToken);
        }



        /// <exclude />
        public static void Scavenge()
        {
            LoggingService.LogVerbose("FlowControllerFacade", "Starting scavenger run");

            List<IFlowInformation> flowInformations = DataFacade.GetData<IFlowInformation>().ToList();

            // NOTE: Low performance implementation
            foreach (IFlowInformation flowInformation in flowInformations)
            {
                TimeSpan timeSpan = DateTime.Now - flowInformation.TimeStamp;
                if (timeSpan > Timeout)
                {
                    FlowToken flowToken = FlowTokenSerializer.Deserialize(flowInformation.SerializedFlowToken);

                    LoggingService.LogVerbose("FlowControllerFacade", string.Format("Scavenging flow started by username '{0}', flow = '{1}'", flowInformation.Username, flowToken));

                    DataFacade.Delete<IFlowInformation>(flowInformation);

                    FlowControllerFacade.CancelFlow(flowToken);
                }
            }
        }



        private static TimeSpan Timeout
        {
            get
            {
                if (_timeout.HasValue == false)
                {
                    _timeout = GlobalSettingsFacade.WorkflowTimeout;
                }

                return _timeout.Value;
            }
        }
    }
}
