using System.Collections.Generic;
using Composite.Security;


namespace Composite.Elements.Plugins.ElementAttachingProvider
{
	internal interface IMultibleResultElementAttachingProvider : IElementAttachingProvider
	{
        /// <summary>
        /// If null is returned, the result is ignored
        /// </summary>
        /// <param name="parentEntityToken"></param>
        /// <param name="piggybag"></param>
        /// <returns></returns>
        IEnumerable<ElementAttachingProviderResult> GetAlternateElementLists(EntityToken parentEntityToken, Dictionary<string, string> piggybag);
	}
}
