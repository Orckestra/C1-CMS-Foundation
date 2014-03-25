using System.Collections.Generic;
using Composite.C1Console.Elements.Plugins.ElementAttachingProvider.Runtime;
using Composite.C1Console.Security;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Elements.Plugins.ElementAttachingProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum ElementAttachingProviderPosition
    {
        /// <summary>
        /// At the top
        /// </summary>
        Top = 0,

        /// <summary>
        /// At the bottom
        /// </summary>
        Bottom = 1
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ElementAttachingProviderResult
    {
        /// <exclude />
        public ElementAttachingProviderResult()
        {
            this.Position = ElementAttachingProviderPosition.Bottom;
        }

        /// <summary>
        /// IF this is null, then the hole result is ignored
        /// </summary>
        public IEnumerable<Element> Elements { get; set; }


        /// <exclude />
        public ElementAttachingProviderPosition Position { get; set; }


        /// <summary>
        /// This is used if more than one element attaching provider is adding elements.
        /// Bigger is higher.
        /// </summary>
        public int PositionPriority { get; set; }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [CustomFactory(typeof(ElementAttachingProviderCustomFactory))]
    [ConfigurationNameMapper(typeof(ElementAttachingProviderDefaultNameRetriever))]
	public interface IElementAttachingProvider
	{
        /// <summary>
        /// The system will supply an ElementProviderContext to the provider
        /// to use for creating ElementHandles
        /// </summary>
        ElementProviderContext Context { set; }


        /// <summary>
        /// This is only called when rendering root nodes. Used to switch HasChildren from false to true.
        /// </summary>
        /// <param name="parentEntityToken"></param>
        /// /// <param name="piggybag"></param>
        /// <returns></returns>
        bool HaveCustomChildElements(EntityToken parentEntityToken, Dictionary<string, string> piggybag);


        /// <summary>
        /// If null is returned, the result is ignored
        /// </summary>
        /// <param name="parentEntityToken"></param>
        /// <param name="piggybag"></param>
        /// <returns></returns>
        ElementAttachingProviderResult GetAlternateElementList(EntityToken parentEntityToken, Dictionary<string, string> piggybag);


        /// <exclude />
        IEnumerable<Element> GetChildren(EntityToken parentEntityToken, Dictionary<string, string> piggybag);
	}
}
