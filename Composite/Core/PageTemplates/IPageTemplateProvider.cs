using System;
using System.Collections.Generic;
using Composite.C1Console.Elements;
using Composite.Core.PageTemplates.Plugins.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.Core.PageTemplates
{
    /// <summary>
    /// Defines page template provider
    /// </summary>
    [CustomFactory(typeof(PageTemplateProviderCustomFactory))]
    public interface IPageTemplateProvider
    {
        /// <summary>
        /// Gets the page template descriptors.
        /// </summary>
        /// <returns></returns>
        IEnumerable<PageTemplateDescriptor> GetPageTemplates();

        /// <summary>
        /// Factory that give C1 CMS a IPageLayouter capable of rendering a C1 CMS page with the specified layout ID.
        /// The factory will be called for each individual page rendering 
        /// </summary>
        /// <returns></returns>
        IPageRenderer BuildPageRenderer(Guid templateId);

        /// <summary>
        /// Adds element actions on "Page templates" element
        /// </summary>
        IEnumerable<ElementAction> GetRootActions();

        /// <summary>
        /// Forces provider to reload all the page templates next time they are requested.
        /// </summary>
        void FlushTemplates();

        /// <summary>
        /// Provider's label that is shown when adding a new page template
        /// </summary>
        string AddNewTemplateLabel { get;  }

        /// <summary>
        /// Workflow for adding a new page template
        /// </summary>
        Type AddNewTemplateWorkflow { get; }
    }
}
