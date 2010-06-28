using System;

namespace Composite.Data.ProcessControlled
{
    [Obsolete("To be removed")]
	internal interface IVersionProcessController : IProcessController
	{
        void OnBeforeDataAdded(IData data);
        void OnBeforeDataUpdated(IData data);
	}
}
