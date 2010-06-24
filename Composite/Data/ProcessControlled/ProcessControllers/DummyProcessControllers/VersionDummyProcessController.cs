using System;
using System.Collections.Generic;
using Composite.Elements;

namespace Composite.Data.ProcessControlled.ProcessControllers.DummyProcessControllers
{
    [Obsolete("To be removed")]
	public sealed class VersionDummyProcessController : IVersionProcessController
	{
        public void OnBeforeDataAdded(IData data)
        {
        }

        public void OnBeforeDataUpdated(IData data)
        {
        }

        public List<ElementAction> GetActions(IData data, Type elementProviderType)
        {
            return new List<ElementAction>();
        }
    }
}
