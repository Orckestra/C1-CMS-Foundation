using System;
using System.IO;
using System.Linq;
using System.Web.WebPages;
using Composite.C1Console.Events;
using Composite.C1Console.Workflow;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.PageTemplates;
using Composite.Core.PageTemplates.Foundation;
using Composite.Core.ResourceSystem;
using Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider;
using Composite.Plugins.PageTemplates.Razor;
using RazorPageTemplate = Composite.AspNet.Razor.RazorPageTemplate;

namespace Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditRazorPageTemplateWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private static readonly string LogTitle = "Razor Edit";

        public EditRazorPageTemplateWorkflow()
        {
            InitializeComponent();
        }



        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            string filePath = GetFilePath();

            WebsiteFile websiteFile = new WebsiteFile(filePath);

            this.Bindings.Add("FilePath", filePath);
            this.Bindings.Add("FileContent", websiteFile.ReadAllText());
            this.Bindings.Add("FileName", websiteFile.FileName);
            this.Bindings.Add("FileMimeType", websiteFile.MimeType);
        }



        private void saveCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            string filePath = GetFilePath();

            WebsiteFile websiteFile = new WebsiteFile(filePath);

            string content = this.GetBinding<string>("FileContent");

            Guid newTemplateId = Guid.Empty;
            bool isValid = ValidateMarkup(filePath, content, ref newTemplateId);

            if (isValid)
            {
                websiteFile.WriteAllText(content);

                RazorPageTemplateProvider provider = GetTemplateProvider(GetTemplateId());
                provider.Reinitialize();

                PageTemplateProviderRegistry.Flush();

                this.CreateParentTreeRefresher().PostRefreshMesseges(this.EntityToken);
            }

            if (isValid && newTemplateId != Guid.Empty)
            {
                SetSaveStatus(true, new PageTemplateEntityToken(newTemplateId));
            }
            else
            {
                SetSaveStatus(isValid);
            }
        }


        private bool ValidateMarkup(string filePath, string content, ref Guid newTemplateId)
        {
            string fileName = Path.GetFileName(filePath);

            string tempFile = Path.GetDirectoryName(filePath) + @"\_tmp_" + fileName;
            Guid templateId = GetTemplateId();

            RazorPageTemplateProvider provider = GetTemplateProvider(templateId);

            string virtualPath = provider.ConvertToVirtualPath(tempFile);

            try
            {
                C1File.WriteAllText(tempFile, content);

                WebPageBase webPageBase;

                try
                {
                    webPageBase = WebPage.CreateInstanceFromVirtualPath(virtualPath);
                }
                catch (Exception ex)
                {
                    Log.LogWarning(LogTitle, "Compilation failed while validating changes to '{0}'", virtualPath);
                    Log.LogWarning(LogTitle, ex);

                    string message = ex.Message;

                    if(message.StartsWith(tempFile, StringComparison.OrdinalIgnoreCase))
                    {
                        message = fileName + message.Substring(tempFile.Length);
                    }

                    ShowWarning(GetText("EditTemplate.Validation.CompilationFailed")
                                .FormatWith(message));
                    return false;
                }

                if (webPageBase == null || !(webPageBase is RazorPageTemplate))
                {
                    ShowWarning(GetText("EditTemplate.Validation.IncorrectBaseClass")
                                .FormatWith(typeof(RazorPageTemplate).FullName));
                    return false;
                }

                Guid tempTemplateId;
                string newTitle, newDescription;

                var pageTemplate = webPageBase as RazorPageTemplate;

                try
                {
                    tempTemplateId = pageTemplate.TemplateId;
                }
                catch (Exception ex)
                {
                    ShowPropertyError("TemplateId", ex);
                    return false;
                }

                try
                {
                    newTitle = pageTemplate.TemplateTitle;
                }
                catch (Exception ex)
                {
                    ShowPropertyError("TemplateTitle", ex);
                    return false;
                }

                try
                {
                    newDescription = pageTemplate.TemplateDescription;
                }
                catch (Exception ex)
                {
                    ShowPropertyError("TemplateDescription", ex);
                    return false;
                }

                if(IsPageTemplate)
                {
                    if(GetPageTemplateDescriptor().IsValid)
                    {
                        // Forbidding to change template id from this workflow in order to avoid mistakes
                        if (tempTemplateId != templateId)
                        {
                            ShowWarning(GetText("EditTemplate.Validation.TemplateIdChanged").FormatWith(templateId));
                            return false;
                        }
                    }
                    else
                    {
                        newTemplateId = tempTemplateId;
                    }
                }
            }
            finally
            {
                C1File.Delete(tempFile);
            }

            return true;
        }


        private void ShowPropertyError(string propertyName, Exception ex)
        {
            ShowWarning(GetText("EditTemplate.Validation.PropertyError")
                        .FormatWith(propertyName, ex.Message));
        }


        private void ShowWarning(string warning)
        {
            this.ShowMessage(DialogType.Warning,
                 GetText("EditTemplate.Validation.DialogTitle"),
                 warning);
        }

        private RazorPageTemplateProvider GetTemplateProvider(Guid templateId)
        {
            var provider = PageTemplateProviderRegistry.GetProviderByTemplateId(templateId) as RazorPageTemplateProvider;
            Verify.IsNotNull(provider, "Failed to get page template provider");

            return provider;
        }

        private Guid GetTemplateId()
        {
            var entityToken = this.EntityToken;
            Verify.That(entityToken is PageTemplateEntityToken, "Invalid entity token type '{0}'", entityToken.GetType());

            var pageTemplateEntityToken = (PageTemplateEntityToken)entityToken;
            return pageTemplateEntityToken.TemplateId;
        }

        private string GetText(string text)
        {
            return StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateElementProvider", text);
        }

        private RazorPageTemplateDescriptor GetPageTemplateDescriptor()
        {
            Guid templateId = GetTemplateId();

            var template = PageTemplateFacade.GetPageTemplates().FirstOrDefault(t => t.Id == templateId);
            Verify.IsNotNull(template, "Faile to find page template by ID '{0}'", templateId);

            return (PageTemplates.Razor.RazorPageTemplateDescriptor)template;
        }

        private bool IsPageTemplate
        {
            get { return this.EntityToken is PageTemplateEntityToken; }
        }

        private string GetFilePath()
        {
            // TODO: support for shared files editing

            return GetPageTemplateDescriptor().FilePath;
        }
    }
}
