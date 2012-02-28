using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Linq;
using Composite.Functions;
using Composite.C1Console.Security;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Core.ResourceSystem;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Pages
{
    internal sealed class SitemapXmlFunction : StandardFunctionBase
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
                    "SitemapScope",
                    typeof(SitemapScope),
                    false,
                    new ConstantValueProvider(SitemapScope.All),
                    associationDropDown);
            }
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            SitemapScope SitemapScope = parameters.GetParameter<SitemapScope>("SitemapScope");
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

            return PageStructureInfo.GetSitemapByScope(SitemapScope, pageId);
        }


        public static IEnumerable<KeyValuePair<SitemapScope, string>> PageAssociationRestrictions()
        {
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Current, "Current page");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.All, "All pages (no filter)");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.AncestorsAndCurrent, "Ancestors and current (breadcrumb)");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Ancestors, "Ancestor pages");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Parent, "Parent page");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Descendants, "Descendant pages");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.DescendantsAndCurrent, "Current and descendant pages");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Children, "Child pages");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Siblings, "Sibling pages");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level1, "Level 1 page (homepage)");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level1AndDescendants, "Level 1 and descendant pages (current site)");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level1AndSiblings, "Level 1 and sibling pages (all homepages)");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level2, "Level 2 page");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level2AndDescendants, "Level 2 and descendant pages");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level2AndSiblings, "Level 2 and sibling pages (site main areas)");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level3, "Level 3 page");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level3AndDescendants, "Level 3 and descendant pages");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level3AndSiblings, "Level 3 and sibling pages");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level4, "Level 4 page");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level4AndDescendants, "Level 4 and descendant pages");
            yield return new KeyValuePair<SitemapScope, string>(SitemapScope.Level4AndSiblings, "Level 4 and sibling pages");
        }

    }
}
