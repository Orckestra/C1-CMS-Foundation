using System.Collections.Generic;
using Composite.C1Console.Elements;


namespace Composite.Data.ProcessControlled
{
    internal interface IPublishProcessController : IProcessController
	{
        void SetStartStatus(IData data);

        IDictionary<string, string> GetValidTransitions(IData data);

        /// <summary>
        /// Returns true if auxilaries should be called, false if they should not be called
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        bool OnAfterDataUpdated(IData data);

        /// <summary>
        /// Returns true if auxilaries should be called, false if they should not be called
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        bool OnAfterBuildNew(IData data);

        void ValidateTransition(IData data, string status);
	}
}
