using System;
using System.Collections.Generic;
using Composite.Elements;

namespace Composite.Data.ProcessControlled.ProcessControllers.DummyProcessControllers
{
	public sealed class PublishDummyProcessController : IPublishProcessController
	{
        public void SetStartStatus(IData data)
        {
        }

        public IDictionary<string, string> GetValidTransitions(IData data)
        {
            return new Dictionary<string, string>();
        }

        public bool OnAfterDataUpdated(IData data)
        {
            return true;
        }

        public bool OnAfterBuildNew(IData data)
        {
            return true;
        }

        public void ValidateTransition(IData data, string status)
        {
        }

        public List<ElementAction> GetActions(IData data, Type elementProviderType)
        {
            return new List<ElementAction>();
        }
    }
}
