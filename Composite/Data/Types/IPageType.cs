using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Core.Linq;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum PageTypeHomepageRelation
    {
        /// <exclude />
        NoRestriction = 1,

        /// <exclude />
        OnlySubPages = 2,

        /// <exclude />
        OnlyHomePages = 3
    }




    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class PageTypeHomepageRelationExtensionMethods
    {
        /// <exclude />
        public static PageTypeHomepageRelation GetPageTypeHomepageRelation(this string value)
        {
            if (string.IsNullOrEmpty(value)) throw new ArgumentNullException("value");

            PageTypeHomepageRelation result;
            if (Enum.TryParse<PageTypeHomepageRelation>(value, out result) == false)
            {
                throw new ArgumentException(string.Format("The argument is wrongly formattet"));
            }

            return result;
        }



        /// <exclude />
        public static string ToPageTypeHomepageRelationString(this PageTypeHomepageRelation pageTypeHomepageRelation)
        {
            return pageTypeHomepageRelation.ToString();
        }
    }




    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class PageTypeExtensionMethods
    {
        /// <exclude />
        public static IEnumerable<IPageType> GetChildPageSelectablePageTypes(this IPage parentPage, IPage childPage = null)
        {
            if (parentPage == null)
            {
                return
                    DataFacade.GetData<IPageType>().
                    Where(f => f.Available && f.HomepageRelation != PageTypeHomepageRelation.OnlySubPages.ToString()).
                    OrderBy(f => f.Name).
                    Evaluate();
            }

            IEnumerable<IPageType> pageTypes;
            if (childPage == null)
            {
                pageTypes =
                    DataFacade.GetData<IPageType>().
                        Where(f => f.Available && f.HomepageRelation != PageTypeHomepageRelation.OnlyHomePages.ToString()).
                        OrderBy(f => f.Name).
                        Evaluate();
            }
            else
            {
                pageTypes =
                    DataFacade.GetData<IPageType>().
                        Where(f => 
                            f.Available && 
                            (f.HomepageRelation != PageTypeHomepageRelation.OnlyHomePages.ToString() || f.Id == childPage.PageTypeId)).
                        OrderBy(f => f.Name).
                        Evaluate();
            }

            var result = new List<IPageType>();
            foreach (IPageType pageType in pageTypes)
            {
                if (childPage != null && pageType.Id == childPage.PageTypeId)
                {
                    result.Add(pageType); 
                    continue;
                }

                var parentRestrictions = DataFacade.GetData<IPageTypeParentRestriction>()
                    .Where(f => f.PageTypeId == pageType.Id)
                    .ToList();

                if (parentRestrictions.Count == 0 || parentRestrictions.Any(f => f.AllowedParentPageTypeId == parentPage.PageTypeId))
                {
                    result.Add(pageType);
                }
            }

            return result;
        }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [ImmutableTypeId("{867BE4ED-9C6C-49B9-AC30-35D65066BA4C}")]
    [KeyPropertyName("Id")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    [DataScope(DataScopeIdentifier.PublicName)]
    [LabelPropertyName("Name")]
    [CachingAttribute(CachingType.Full)]
    public interface IPageType : IData
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{333BFEA0-ACD2-4500-A258-5305DFC72DC7}")]
        Guid Id { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 256)]
        [ImmutableFieldId("{0170DD8F-D44D-4F84-BD79-296E75885FDD}")]
        string Name { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        [ImmutableFieldId("{CCAA5F15-63E4-42BF-8CDA-3AD0407520A7}")]        
        string Description { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Boolean)]
        [ImmutableFieldId("{51DEADD0-7E5C-43F4-ADF5-5E092798B8DE}")]
        [DefaultFieldBoolValue(true)]
        bool Available { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Boolean)]
        [ImmutableFieldId("{A489FFEB-6D65-4ED6-84E2-3FECB8F3733D}")]
        [DefaultFieldBoolValue(true)]
        bool PresetMenuTitle { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{5C5A5B74-992C-4587-86C3-667B9BE22B36}")]
        Guid DefaultTemplateId { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 64)]
        [ImmutableFieldId("{5924B690-F7CC-4110-A3AB-227BD0E87289}")]        
        string HomepageRelation { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{4F9B76CB-5389-487C-92E3-A6DB4F1E5EFC}")]
        Guid DefaultChildPageType { get; set; }
    }
}
