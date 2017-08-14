using System.Collections.Generic;
using Composite.C1Console.Security;


namespace Composite.C1Console.Elements.Plugins.ElementAttachingProvider
{
	internal interface IMultipleResultElementAttachingProvider : IElementAttachingProvider
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
