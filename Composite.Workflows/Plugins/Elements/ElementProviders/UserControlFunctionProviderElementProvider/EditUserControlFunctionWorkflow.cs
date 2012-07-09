using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Web.UI;
using Composite.AspNet;
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
using Composite.Plugins.Functions.FunctionProviders.UserControlFunctionProvider;

namespace Composite.Plugins.Elements.ElementProviders.UserControlFunctionProviderElementProvider
{
    [EntityTokenLock]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditUserControlFunctionWorkflow : BaseFunctionWorkflow
    {
        private static readonly string LogTitle = typeof(EditUserControlFunctionWorkflow).Name;

        public EditUserControlFunctionWorkflow()
        {
            InitializeComponent();
        }

        private string[] GetFiles(FileBasedFunction<UserControlBasedFunction> function)
        {
            var result = new List<string>();

            string markupFilePath = PathUtil.Resolve(function.VirtualPath);
            result.Add(markupFilePath);

            string codeFile = markupFilePath + ".cs";
            if(C1File.Exists(codeFile))
            {
                result.Add(codeFile);
            }

            return result.ToArray();
        }

        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            FileBasedFunctionProvider<UserControlBasedFunction> provider;
            FileBasedFunction<UserControlBasedFunction> function;

            GetProviderAndFunction((FileBasedFunctionEntityToken)this.EntityToken, out provider, out function);
            
            string title = Path.GetFileName(function.VirtualPath);

            this.Bindings.Add("Title", title);

            string[] files = GetFiles(function);

            // Binding all the files
            for(int i=0; i<files.Length; i++)
            {
                var websiteFile = new WebsiteFile(files[i]);

                string bindingPrefix = "File" + (i + 1);

                this.Bindings.Add(bindingPrefix + "Content", websiteFile.ReadAllText());
                this.Bindings.Add(bindingPrefix + "Name", websiteFile.FileName);
                this.Bindings.Add(bindingPrefix + "MimeType", websiteFile.MimeType);
            }
        }


        private void saveCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            var functionEntityToken = (FileBasedFunctionEntityToken)this.EntityToken;

            FileBasedFunctionProvider<UserControlBasedFunction> provider;
            FileBasedFunction<UserControlBasedFunction> function;

            GetProviderAndFunction(functionEntityToken, out provider, out function);

            string[] files = GetFiles(function);

            var fileContent = new List<string>();

            for (int i = 0; i < files.Length; i++)
            {
                string bindingPrefix = "File" + (i + 1);

                fileContent.Add(this.GetBinding<string>(bindingPrefix + "Content"));
            }

            if (!CompileAndValidate(files, fileContent))
            {
                SetSaveStatus(false);
                return;
            }

            for (int i = 0; i < files.Length; i++)
            {
                var websiteFile = new WebsiteFile(files[i]);

                websiteFile.WriteAllText(fileContent[i]);
            }

            provider.ReloadFunctions();

            this.CreateParentTreeRefresher().PostRefreshMesseges(this.EntityToken);

            SetSaveStatus(true);
        }

        private bool CompileAndValidate(string[] files, IList<string> fileContent)
        {
            string tempMarkupFile = GetTempFilePath(files[0]);
            string tempCodeBehindFile = null; 

            string tempMarkupFileContent = fileContent[0];

            if(files.Length > 1)
            {
                tempCodeBehindFile = GetTempFilePath(files[1]);

                string originalCsFileName = Path.GetFileName(files[1]);
                string newCsFileName = Path.GetFileName(tempCodeBehindFile);

                // Fixing the refecence to the CS file in the temporary created .ascx file so it will point
                // to the temporary CS file. Just string.Replace(), writing a sofisticated parser would be overkill

                int offset = tempMarkupFileContent.IndexOf(originalCsFileName, StringComparison.OrdinalIgnoreCase);

                if(offset > 0)
                {
                    tempMarkupFileContent = tempMarkupFileContent.Substring(0, offset)
                                            + newCsFileName
                                            + tempMarkupFileContent.Substring(offset + originalCsFileName.Length);
                }
            }

            try
            {
                File.WriteAllText(tempMarkupFile, tempMarkupFileContent); 

                if(tempCodeBehindFile != null)
                {
                    File.WriteAllText(tempCodeBehindFile, fileContent[1]); 
                }

                string virtualPath = "~" + PathUtil.GetWebsitePath(tempMarkupFile);


                UserControl userControl;

                try
                {
                    var page = new Page();
                    userControl = (UserControl) page.LoadControl(virtualPath);
                }
                catch(Exception ex)
                {
                    Log.LogWarning(LogTitle, "Failed to compile ASCX file");
                    Log.LogWarning(LogTitle, ex);

                    Exception compilationException = (ex is TargetInvocationException) ? ex.InnerException : ex;

                    // Replacing file path and temp file name from error message as it is irrelevant to the user
                    string markupFileName = Path.GetFileName(files[0]);
                    string errorMessage = compilationException.Message;

                    if (errorMessage.StartsWith(tempMarkupFile, StringComparison.OrdinalIgnoreCase))
                    {
                        errorMessage = markupFileName + errorMessage.Substring(tempMarkupFile.Length);
                    }

                    ShowWarning(GetText("EditUserControlFunctionWorkflow.Validation.CompilationFailed")
                                .FormatWith(errorMessage));

                    return false;
                }

                return Validate(userControl);
            }
            finally
            {
                // Deleting temporary files
                File.Delete(tempMarkupFile);
                if (tempCodeBehindFile != null)
                {
                    File.Delete(tempCodeBehindFile);
                }
            }
        }

        private bool Validate(UserControl userControl)
        {
            var userControlFunction = userControl as UserControlFunction;
            if (userControlFunction == null)
            {
                ShowWarning(GetText("EditUserControlFunctionWorkflow.Validation.IncorrectBaseClass")
                            .FormatWith(typeof(UserControlFunction).FullName));
                return false;
            }


            return true;
        }


        private void ShowWarning(string warning)
        {
            this.ShowMessage(DialogType.Warning,
                 GetText("EditUserControlFunctionWorkflow.Validation.DialogTitle"),
                 warning);
        }

        private string GetText(string text)
        {
            return StringResourceSystemFacade.GetString("Composite.Plugins.UserControlFunction", text);
        }


        private string GetTempFilePath(string filePath)
        {
            string fileName = Path.GetFileName(filePath);
            string folderPath = Path.GetDirectoryName(filePath);

            return Path.Combine(folderPath, "_temp_" + fileName);
        }
    }
}
