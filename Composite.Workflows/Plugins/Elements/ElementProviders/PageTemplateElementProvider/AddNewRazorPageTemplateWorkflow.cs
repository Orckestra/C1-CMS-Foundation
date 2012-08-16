using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Workflow.Activities;
using Composite.C1Console.Actions;
using Composite.C1Console.Workflow;
using Composite.Core.IO;
using Composite.Core.PageTemplates;
using Composite.Core.PageTemplates.Foundation;
using Composite.Core.PageTemplates.Foundation.PluginFacade;
using Composite.Core.ResourceSystem;
using Composite.Plugins.Elements.ElementProviders.Common;
using Composite.Plugins.PageTemplates.Razor;


namespace Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewRazorPageTemplateWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private static readonly string Binding_Title = "Title";

        private static readonly string Marker_TemplateId = "%TemplateId%";
        private static readonly string Marker_TemplateTitle = "%TemplateTitle%";

        private static readonly string DefaultRazorTemplateMarkup = PageTemplateHelper.LoadDefaultTemplateFile("RazorPageTemplate.txt");

        public AddNewRazorPageTemplateWorkflow()
        {
            InitializeComponent();
        }


        private void codeActivity1_ExecuteCode(object sender, EventArgs e)
        {
            this.Bindings.Add(Binding_Title, string.Empty);

            List<KeyValuePair<Guid, string>> templatesOptions =
                (from template in PageTemplateFacade.GetPageTemplates().OfType<RazorPageTemplateDescriptor>()
                 where template.IsValid
                 orderby template.Title
                 select new KeyValuePair<Guid, string>(template.Id, template.Title)).ToList();

            templatesOptions.Insert(0, new KeyValuePair<Guid, string>(
                Guid.Empty, GetText("AddNewRazorPageTemplate.LabelCopyFromEmptyOption")));

            Guid mostUsedTemplate = PageTemplateHelper.GetTheMostUsedTemplate(templatesOptions.Select(p => p.Key));

            this.Bindings.Add("CopyOfOptions", templatesOptions);
            this.Bindings.Add("CopyOfId", mostUsedTemplate);
        }



        private void codeActivity2_ExecuteCode(object sender, EventArgs e)
        {
            AddNewTreeRefresher addNewTreeRefresher = this.CreateAddNewTreeRefresher(this.EntityToken);

            Guid newTemplateId = Guid.NewGuid();
            string newTitle = this.GetBinding<string>(Binding_Title);

            string newPageTemplateMarkup, folderPath;

            Guid copyOfId = this.GetBinding<Guid>("CopyOfId");
            if (copyOfId == Guid.Empty)
            {
                newPageTemplateMarkup = DefaultRazorTemplateMarkup;
                folderPath = GetRazorTemplatesRootFolder();
            }
            else
            {
                ParseExistingTemplateForCopying(copyOfId, out newPageTemplateMarkup, out folderPath);
            }

            newPageTemplateMarkup = newPageTemplateMarkup
                    .Replace(Marker_TemplateId, newTemplateId.ToString())
                    .Replace(Marker_TemplateTitle, CSharpEncodeString(newTitle));

            
            string filePath = GeneratedCshtmlFileName(folderPath, newTitle, newTemplateId);

            C1File.WriteAllText(filePath, newPageTemplateMarkup);

            var entityToken = new PageTemplateEntityToken(newTemplateId);

            PageTemplateProviderRegistry.FlushTemplates();

            addNewTreeRefresher.PostRefreshMesseges(entityToken);

            this.ExecuteAction(entityToken, new WorkflowActionToken(typeof(EditRazorPageTemplateWorkflow)));
        }

        private static string GeneratedCshtmlFileName(string root, string templateTitle, Guid TemplateId)
        {
            string fileName = PathUtil.CleanFileName(templateTitle, true) ?? TemplateId.ToString();

            for(int i=0; i<100; i++)
            {
                string filePath = Path.Combine(root, fileName + (i == 0 ? "" : "_" + i.ToString()) + ".cshtml");

                if(!C1File.Exists(filePath))
                {
                    return filePath;
                }
            }

            throw new InvalidOperationException("Failed to generate file name");
        }

        private string GetRazorTemplatesRootFolder()
        {
            foreach(string providerName in PageTemplateProviderRegistry.ProviderNames)
            {
                var provider = PageTemplateProviderPluginFacade.GetProvider(providerName);
                if(provider is RazorPageTemplateProvider)
                {
                    return (provider as RazorPageTemplateProvider).TemplateDirectoryPath;
                }
            }

            throw new InvalidOperationException("Failed to get instance of " + typeof(RazorPageTemplateProvider));
        }

        private void ParseExistingTemplateForCopying(Guid templateId, out string codeTemplate, out string folderPath)
        {
            var razorTemplate = PageTemplateFacade.GetPageTemplate(templateId) as RazorPageTemplateDescriptor;
            Verify.IsNotNull(razorTemplate, "Failed to get razor template descriptor by id '{0}'", templateId);

            var provider = PageTemplateProviderRegistry.GetProviderByTemplateId(templateId) as RazorPageTemplateProvider;
            Verify.IsNotNull(provider, "Failed to get razor template provider by template id '{0}'", templateId);

            string fullPath = PathUtil.Resolve(razorTemplate.VirtualPath);
            string text = C1File.ReadAllText(fullPath);

            

            const string quote = @"""";

            Verify.That(text.IndexOf(templateId.ToString(), StringComparison.OrdinalIgnoreCase) > 0, 
                "Failed to replace existing templateId '{0}'", templateId);

            text = ReplaceString(text, templateId.ToString(), Marker_TemplateId, StringComparison.OrdinalIgnoreCase);

            // Replacing title
            text = text.Replace("@" + quote + razorTemplate.Title.Replace(quote, quote + quote) + quote,
                                quote + Marker_TemplateTitle + quote)
                       .Replace(quote + CSharpEncodeString(razorTemplate.Title) + quote,
                                quote + Marker_TemplateTitle + quote);

            codeTemplate = text;
            folderPath = Path.GetDirectoryName(fullPath);
        }



        private void IsTitleUsed(object sender, ConditionalEventArgs e)
        {
            string title = this.GetBinding<string>(Binding_Title);

            e.Result = PageTemplateFacade.GetPageTemplates()
                            .Any(f => f.Title.Equals(title, StringComparison.InvariantCultureIgnoreCase));
        }



        private void ValidateFilePath(object sender, ConditionalEventArgs e)
        {
            string title = this.GetBinding<string>(Binding_Title);
            string rootFolder = GetRazorTemplatesRootFolder();

            string cshtmlFilePath = GeneratedCshtmlFileName(rootFolder, title, new Guid());

            const int maximumFilePathLength = 250;

            if (cshtmlFilePath.Length > maximumFilePathLength)
            {
                ShowFieldMessage(Binding_Title, GetText("AddNewRazorPageTemplateWorkflow.TitleTooLong"));
                e.Result = false;
                return;
            }

            e.Result = true;
        }


        static string ReplaceString(string str, string oldValue, string newValue, StringComparison comparison)
        {
            var sb = new StringBuilder();

            int previousIndex = 0;
            int index = str.IndexOf(oldValue, comparison);
            while (index != -1)
            {
                sb.Append(str.Substring(previousIndex, index - previousIndex));
                sb.Append(newValue);
                index += oldValue.Length;

                previousIndex = index;
                index = str.IndexOf(oldValue, index, comparison);
            }
            sb.Append(str.Substring(previousIndex));

            return sb.ToString();
        }

        private static string CSharpEncodeString(string text)
        {
            return text.Replace("\\", "\\\\").Replace("\"", "\\\"");
        }

        private void showFieldErrorCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            ShowFieldMessage(Binding_Title, GetText("AddNewRazorPageTemplateWorkflow.TitleInUseTitle"));
        }

        private static string GetText(string stringName)
        {
            return StringResourceSystemFacade.GetString("Composite.Plugins.RazorPageTemplate", stringName);
        }
    }
}
