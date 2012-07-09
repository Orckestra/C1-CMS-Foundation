using System;
using System.IO;
using System.Reflection;
using System.Web.WebPages;
using Composite.AspNet.Razor;
using Composite.AspNet.Security;
using Composite.C1Console.Events;
using Composite.C1Console.Workflow;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.ResourceSystem;
using Composite.Plugins.Elements.ElementProviders.Common;
using Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider;
using Composite.Plugins.Functions.FunctionProviders.FileBasedFunctionProvider;
using Composite.Plugins.Functions.FunctionProviders.RazorFunctionProvider;

namespace Composite.Plugins.Elements.ElementProviders.RazorFunctionProviderElementProvider
{
    [EntityTokenLock]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditRazorFunctionWorkflow : BaseFunctionWorkflow
    {
        private static readonly string LogTitle = typeof(EditRazorFunctionWorkflow).Name;

        public EditRazorFunctionWorkflow()
        {
            InitializeComponent();
        }

        private string GetFile(FileBasedFunction<RazorBasedFunction> function)
        {
            return PathUtil.Resolve(function.VirtualPath);
        }

        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            FileBasedFunctionProvider<RazorBasedFunction> provider;
            FileBasedFunction<RazorBasedFunction> function;

            GetProviderAndFunction((FileBasedFunctionEntityToken)this.EntityToken, out provider, out function);
            
            string title = Path.GetFileName(function.VirtualPath);

            this.Bindings.Add("Title", title);

            string file = GetFile(function);

            var websiteFile = new WebsiteFile(file);

            this.Bindings.Add("FileContent", websiteFile.ReadAllText());
            this.Bindings.Add("FileName", websiteFile.FileName);
            this.Bindings.Add("FileMimeType", websiteFile.MimeType);

        }


        private void saveCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            var functionEntityToken = (FileBasedFunctionEntityToken)this.EntityToken;

            FileBasedFunctionProvider<RazorBasedFunction> provider;
            FileBasedFunction<RazorBasedFunction> function;

            GetProviderAndFunction(functionEntityToken, out provider, out function);

            string file = GetFile(function);

            string fileContent = this.GetBinding<string>("FileContent");

            if (!CompileAndValidate(file, fileContent))
            {
                SetSaveStatus(false);
                return;
            }

            var websiteFile = new WebsiteFile(file);
            websiteFile.WriteAllText(fileContent);


            provider.ReloadFunctions();

            this.CreateParentTreeRefresher().PostRefreshMesseges(this.EntityToken);

            SetSaveStatus(true);
        }

        private bool CompileAndValidate(string file, string fileContent)
        {
            string tempMarkupFile = GetTempFilePath(file);

            try
            {
                File.WriteAllText(tempMarkupFile, fileContent);
                string tempFileVirtualPath = "~" + PathUtil.GetWebsitePath(tempMarkupFile);

                WebPageBase webPageBase;

                try
                {
                    webPageBase = WebPage.CreateInstanceFromVirtualPath(tempFileVirtualPath);
                }
                catch(Exception ex)
                {
                    Log.LogWarning(LogTitle, "Failed to compile CSHTML file");
                    Log.LogWarning(LogTitle, ex);

                    Exception compilationException = (ex is TargetInvocationException) ? ex.InnerException : ex;

                    // Replacing file path and temp file name from error message as it is irrelevant to the user
                    string markupFileName = Path.GetFileName(file);
                    string errorMessage = compilationException.Message;

                    if (errorMessage.StartsWith(tempMarkupFile, StringComparison.OrdinalIgnoreCase))
                    {
                        errorMessage = markupFileName + errorMessage.Substring(tempMarkupFile.Length);
                    }

                    ShowWarning(GetText("EditRazorFunctionWorkflow.Validation.CompilationFailed")
                                .FormatWith(errorMessage));

                    return false;
                }

                return Validate(webPageBase);
            }
            finally
            {
                // Deleting temporary file
                File.Delete(tempMarkupFile);
            }
        }

        private bool Validate(WebPageBase webPageBase)
        {
            var razorFunction = webPageBase as RazorFunction;
            if (razorFunction == null)
            {
                ShowWarning(GetText("EditRazorFunctionWorkflow.Validation.IncorrectBaseClass")
                            .FormatWith(typeof(RazorFunction).FullName));
                return false;
            }


            return true;
        }


        private void ShowWarning(string warning)
        {
            this.ShowMessage(DialogType.Warning,
                 GetText("EditRazorFunctionWorkflow.Validation.DialogTitle"),
                 warning);
        }

        private string GetText(string text)
        {
            return StringResourceSystemFacade.GetString("Composite.Plugins.RazorFunction", text);
        }


        private string GetTempFilePath(string filePath)
        {
            string fileName = Path.GetFileName(filePath);
            string folderPath = Path.GetDirectoryName(filePath);

            return Path.Combine(folderPath, "_temp_" + fileName);
        }
    }
}
