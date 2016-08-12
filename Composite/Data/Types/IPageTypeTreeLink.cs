using System;
using System.Collections.Generic;
using Composite.Data.DynamicTypes;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;
using Composite.C1Console.Trees;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [ImmutableTypeId("{5B4A6EF1-B3AF-4862-AA21-DAC96EAE300B}")]
    [KeyPropertyName("Id")]    
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    [DataScope(DataScopeIdentifier.PublicName)]
    [CachingAttribute(CachingType.Full)]
    public interface IPageTypeTreeLink : IData
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{AAD20063-DB23-4F54-93FA-C3E4092DF54A}")]
        Guid Id { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{FAB31A74-D71F-4C30-8FF9-8D053682E8E4}")]
        [ForeignKey(typeof(IPageType), "Id", AllowCascadeDeletes = true)]
        Guid PageTypeId { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 2048)]
        [ImmutableFieldId("{A343ED1C-0298-4119-A56B-174F45106CFC}")]
        string TreeId { get; set; }
    }






    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class IPageTypeTreeLinkExtensionMethods
    {
        /// <summary>
        /// Removes data items that refer to trees that are not registered.
        /// </summary>
        /// <param name="pageTypeTreeLinks"></param>
        /// <returns></returns>
        public static IEnumerable<IPageTypeTreeLink> RemoveDeadLinks(this IEnumerable<IPageTypeTreeLink> pageTypeTreeLinks)
        {
            foreach (IPageTypeTreeLink pageTypeTreeLink in pageTypeTreeLinks)
            {
                if (TreeFacade.GetTree(pageTypeTreeLink.TreeId) == null)
                {
                    DataFacade.Delete<IPageTypeTreeLink>(pageTypeTreeLink);
                }
                else
                {
                    yield return pageTypeTreeLink;
                }
            }
        }
    }
}
