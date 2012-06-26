using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Logging;
using Composite.Core.PageTemplates;
using Composite.Core.PageTemplates.Foundation;
using Composite.Core.Routing;
using Composite.Data;
using Composite.Data.Plugins.DataProvider.Streams;
using Composite.Data.ProcessControlled;
using Composite.Data.Types;
using Composite.Plugins.PageTemplates.MasterPages;
using Composite.Plugins.PageTemplates.Razor;
using SR = Composite.Core.ResourceSystem.StringResourceSystemFacade;


namespace Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeletePageTemplateWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private static readonly string LogTitle = "DeletePageTemplateWorkflow";

        public DeletePageTemplateWorkflow()
        {
            InitializeComponent();
        }


        private void codeActivity2_ExecuteCode(object sender, EventArgs e)
        {
            var entityToken = this.EntityToken;
            ITemplateDeleter templateDeleter = GetPageTemplateDeleter(entityToken);

            string errorMessage = null;
            if (!templateDeleter.CanBeDeleted() || TemplateIsReferenced(templateDeleter.TemplateId, ref errorMessage))
            {

                string message = GetStr("DeletePageTemplateWorkflow.CascadeDeleteErrorMessage");
                if(errorMessage != null)
                {
                    message += " " + errorMessage;
                }

                this.ShowMessage(DialogType.Error,
                    GetStr("DeletePageTemplateWorkflow.CascadeDeleteErrorTitle"),
                    message);

                return;
            }
            
            var parentTreeRefresher = this.CreateParentTreeRefresher();
            parentTreeRefresher.PostRefreshMesseges(EntityToken);

            templateDeleter.DeleteTemplate();
            PageTemplateProviderRegistry.FlushTemplates();
        }

        private static bool TemplateIsReferenced(Guid templateId, ref string errorMessage)
        {
            var displayedPageReferences = new List<string>();
            var pageHash = new HashSet<Guid>();

            int pagesToShow = 5;

            // Page references
            foreach(var publicationScope in new [] { PublicationScope.Published, PublicationScope.Unpublished })
            foreach(var locale in DataLocalizationFacade.ActiveLocalizationCultures)
            {
                using (new DataScope(publicationScope, locale))
                {
                    var pages = DataFacade.GetData<IPage>().Where(p => p.TemplateId == templateId).ToList();

                    foreach (IPage page in pages)
                    {
                        // Showing each page only once
                        if(pageHash.Contains(page.Id)) continue;

                        pageHash.Add(page.Id);

                        if(pagesToShow > 0)
                        {
                            string pageUrl = PageUrls.BuildUrl(new PageUrlData(page), UrlKind.Public, new UrlSpace());

                            string pageReference = pageUrl ?? locale.Name + "/" + page.Id + "/" + page.Title;

                            displayedPageReferences.Add(pageReference);
                            pagesToShow--;
                        }
                    }
                }
            }

            if(pageHash.Count > 0)
            {
                var sb = new StringBuilder();

                foreach (string pageReference in displayedPageReferences)
                {
                    sb.Append(Environment.NewLine).Append(pageReference);
                }

                errorMessage = GetStr("DeletePageTemplateWorkflow.PageReference").FormatWith(pageHash.Count, sb);
                return true;
            }

            // Page type references

            var pageTypeReferences = new List<string>();

            var pageTypes = DataFacade.GetData<IPageType>().Where(pt => pt.DefaultTemplateId == templateId).ToList();

            foreach(var pageType in pageTypes)
            {
                string pageTypeReference = pageType.Name ?? pageType.Id.ToString();

                pageTypeReferences.Add(pageTypeReference);
            }


            if (pageTypeReferences.Count > 0)
            {
                var sb = new StringBuilder();
                foreach (string pageTypeReference in pageTypeReferences)
                {
                    sb.Append(Environment.NewLine).Append("'" + pageTypeReference + "'");
                }

                errorMessage = GetStr("DeletePageTemplateWorkflow.PageTypeReference")
                               .FormatWith(pageTypeReferences.Count, sb);
                return true;
            }

            return false;
        }

        private ITemplateDeleter GetPageTemplateDeleter(EntityToken entityToken)
        {
            if (entityToken is DataEntityToken)
            {
                return new XmlPageTemplateDeleter(entityToken as DataEntityToken);
            }

            if(entityToken is PageTemplateEntityToken)
            {
                Guid pageTemplateId = (entityToken as PageTemplateEntityToken).TemplateId;

                var pageTemplateDescriptor = PageTemplateFacade.GetPageTemplate(pageTemplateId);

                if(pageTemplateDescriptor is RazorPageTemplateDescriptor)
                {
                    return new RazorPageTemplateDeleter(pageTemplateDescriptor as RazorPageTemplateDescriptor);
                }

                if(pageTemplateDescriptor is MasterPagePageTemplateDescriptor)
                {
                    return new MasterPagePageTemplateDeleter(pageTemplateDescriptor as MasterPagePageTemplateDescriptor);
                }

                throw new NotSupportedException("Not supported page template descriptor type '{0}'"
                                                    .FormatWith(pageTemplateDescriptor.GetType().FullName));
            }

            throw new NotSupportedException("Not supported entity token type '{0}'".FormatWith(entityToken.GetType().FullName));
        }

        private static string GetStr(string stringName)
        {
            return SR.GetString("Composite.Plugins.PageTemplateElementProvider", stringName);
        }

        private interface ITemplateDeleter
        {
            Guid TemplateId { get; }
            bool CanBeDeleted(); 
            void DeleteTemplate();
        }

        private class XmlPageTemplateDeleter: ITemplateDeleter
        {
            private readonly IXmlPageTemplate _pageTemplate;

            public XmlPageTemplateDeleter(DataEntityToken entityToken)
            {
                var dataEntityToken = entityToken;
                _pageTemplate = (IXmlPageTemplate)dataEntityToken.Data;
            }

            public bool CanBeDeleted()
            {
                return DataFacade.WillDeleteSucceed(_pageTemplate);
            }

            public Guid TemplateId
            {
                get { return _pageTemplate.Id; }
            }

            public void DeleteTemplate()
            {
                IFile file = IFileServices.GetFile<IPageTemplateFile>(_pageTemplate.PageTemplateFilePath);

                ProcessControllerFacade.FullDelete(_pageTemplate);

                if (file != null && file is FileSystemFileBase)
                {
                    FileSystemFileBase baseFile = file as FileSystemFileBase;
                    C1File.Delete(baseFile.SystemPath);

                    try
                    {
                        C1File.Delete(baseFile.SystemPath);
                    }
                    catch
                    {
                        LoggingService.LogWarning(LogTitle, "Failed to delete page template file: '{0}'".FormatWith(baseFile.SystemPath));
                    }
                }
            }
        }

        private class RazorPageTemplateDeleter: ITemplateDeleter
        {
            private readonly RazorPageTemplateDescriptor _templateDescriptor;

            public RazorPageTemplateDeleter(RazorPageTemplateDescriptor templateDescriptor)
            {
                _templateDescriptor = templateDescriptor;
            }

            public Guid TemplateId
            {
                get { return _templateDescriptor.Id; }
            }

            public bool CanBeDeleted()
            {
                return true;
            }

            public void DeleteTemplate()
            {
                string filePath = PathUtil.Resolve(_templateDescriptor.VirtualPath);

                C1File.Delete(filePath);
            }
        }

        private class MasterPagePageTemplateDeleter : ITemplateDeleter
        {
            private readonly MasterPagePageTemplateDescriptor _templateDescriptor;

            public MasterPagePageTemplateDeleter(MasterPagePageTemplateDescriptor templateDescriptor)
            {
                _templateDescriptor = templateDescriptor;
            }

            public Guid TemplateId
            {
                get { return _templateDescriptor.Id; }
            }

            public bool CanBeDeleted()
            {
                return true;
            }

            public void DeleteTemplate()
            {
                try
                {
                    C1File.Delete(_templateDescriptor.FilePath);
                }
                catch(Exception)
                {
                    throw new InvalidOperationException("Failed to delete file " + _templateDescriptor.FilePath);
                }

                try
                {
                    C1File.Delete(_templateDescriptor.CodeBehindFilePath);
                }
                catch (Exception)
                {
                    throw new InvalidOperationException("Failed to delete file " + _templateDescriptor.CodeBehindFilePath);
                }
            }
        }
    }
}
