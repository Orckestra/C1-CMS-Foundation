using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.CodeDom.Compiler;
using System.Reflection;
using Composite.Core.Types;
using Composite;
using Composite.Functions.Inline;
using Microsoft.CSharp;

public partial class C1Intermediate : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (this.IsPostBack == true)
        {
            CompilerParameters compilerParameters = new CompilerParameters();
            compilerParameters.GenerateExecutable = false;
            compilerParameters.GenerateInMemory = true;

            // compilerParameters.ReferencedAssemblies.Add(typeof(Verify).Assembly.Location);

            foreach (string localtion in InlineFunctionHelper.DefaultAssemblies)
            {
                compilerParameters.ReferencedAssemblies.Add(localtion);
            }

            /* Assembly appCodeAssembly = AssemblyFacade.GetAppCodeAssembly();
             if (appCodeAssembly != null)
             {
                 compilerParameters.ReferencedAssemblies.Add(appCodeAssembly.Location);
             }*/


            string code = string.Format(@"using System.Collections.Generic;using System.Linq; using System.Xml.Linq; namespace C1Intermediate {{ public static class MethodContainer {{ public static object Execute() {{ {0} }} }} }}", sourceCodeTextBox.Text);

            CSharpCodeProvider compiler = new CSharpCodeProvider();
            CompilerResults compileResults = compiler.CompileAssemblyFromSource(compilerParameters, code);

            if (compileResults.Errors.HasErrors == true)
            {
                foreach (CompilerError error in compileResults.Errors)
                {
                    

                    resultPlaceHolder.Controls.Add(new LiteralControl("<div>Error at line " + error.Line.ToString() + ": " + error.ErrorText + "</div>"));
                }
            }
            else
            {
                Type type = compileResults.CompiledAssembly.GetTypes().Where(f => f.Name == "MethodContainer").Single();

                MethodInfo methodInfo = type.GetMethod("Execute", BindingFlags.Public | BindingFlags.Static);

                object result = methodInfo.Invoke(null, null);

                if (result == null)
                {
                    result = "(null)";
                }

                resultPlaceHolder.Controls.Add(new LiteralControl("<div>Ok: " + HttpUtility.HtmlEncode(result.ToString()) + "</div>"));
            }
        }
        else
        {
            sourceCodeTextBox.Text = "return true;";
        }
    }
}
