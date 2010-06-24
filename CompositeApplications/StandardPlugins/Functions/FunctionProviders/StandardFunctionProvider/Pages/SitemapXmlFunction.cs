using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Linq;
using Composite.Functions;
using Composite.Security;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.ResourceSystem;
using Composite.Renderings.Page;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Pages
{
    public sealed class SitemapXmlFunction : StandardFunctionBase
    {
        public SitemapXmlFunction(EntityTokenFactory entityTokenFactory)
            : base("SitemapXml", "Composite.Pages", typeof(IEnumerable<XElement>), entityTokenFactory)
        {
        }



        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider associationDropDown = StandardWidgetFunctions.DropDownList(
                    this.GetType(), "PageAssociationRestrictions", "Key", "Value", false, true);

                yield return new StandardFunctionParameterProfile(
                    "SourcePage",
                    typeof(DataReference<IPage>),
                    false,
                    new ConstantValueProvider(null),
                    StandardWidgetFunctions.GetDataReferenceWidget<IPage>());

                yield return new StandardFunctionParameterProfile(
                    "PageAssociationScope",
                    typeof(PageAssociationScope),
                    false,
                    new ConstantValueProvider(PageAssociationScope.AllPages),
                    associationDropDown);
            }
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            PageAssociationScope pageAssociationScope = parameters.GetParameter<PageAssociationScope>("PageAssociationScope");
            DataReference<IPage> pageReference = parameters.GetParameter<DataReference<IPage>>("SourcePage");

            Guid pageId;
            if (pageReference != null && pageReference.IsSet)
            {
                pageId = (Guid)pageReference.KeyValue;
            }
            else
            {
                pageId = PageRenderer.CurrentPageId;
            }

            return PageStructureInfo.GetSitemapByScope(pageAssociationScope, pageId);
        }


        public static IEnumerable<KeyValuePair<PageAssociationScope, string>> PageAssociationRestrictions()
        {
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.CurrentPage, "Current page");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.AllPages, "All pages (no filter)");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.AncestorAndCurrentPages, "Ancestors and current (breadcrumb)");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.AncestorPages, "Ancestor pages");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.ParentPage, "Parent page");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.CurrentAndDescendantPages, "Current and descendant pages");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.ChildPages, "Child pages");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.SiblingPages, "Sibling pages");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level1Page, "Level 1 page (homepage)");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level1AndDescendantPages, "Level 1 and descendant pages (current site)");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level1AndSiblingPages, "Level 1 and sibling pages (all homepages)");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level2Page, "Level 2 page");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level2AndDescendantPages, "Level 2 and descendant pages");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level2AndSiblingPages, "Level 2 and sibling pages (site main areas)");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level3Page, "Level 3 page");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level3AndDescendantPages, "Level 3 and descendant pages");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level3AndSiblingPages, "Level 3 and sibling pages");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level4Page, "Level 4 page");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level4AndDescendantPages, "Level 4 and descendant pages");
            yield return new KeyValuePair<PageAssociationScope, string>(PageAssociationScope.Level4AndSiblingPages, "Level 4 and sibling pages");
        }

    }
}
