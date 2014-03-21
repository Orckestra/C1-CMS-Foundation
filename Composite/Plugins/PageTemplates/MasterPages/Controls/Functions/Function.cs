using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Xml.Linq;
using Composite.Core.Extensions;
using Composite.Core.Types;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Core.Xml;
using Composite.Functions;

namespace Composite.Plugins.PageTemplates.MasterPages.Controls.Functions
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [PersistChildren(false)]
    [ParseChildren(true, "Parameters")]
    public class Function : Control
    {
        private static readonly string LogTitle = "Controls.Function";

        /// <exclude />
        public string Name { get; set; }

        private ParamCollection _parameters;

        /// <exclude />
        [PersistenceMode(PersistenceMode.InnerDefaultProperty)]
        [DefaultValue(default(string))]
        [MergableProperty(false)]
        public ParamCollection Parameters
        {
            get
            {
                if (_parameters == null)
                {
                    _parameters = new ParamCollection();
                }

                return _parameters;
            }
        }

        /// <exclude />
        protected override void OnInit(EventArgs e)
        {
            Type returnType;
            object result;
            string functionName = Name;

            var functionContextContainer = PageRenderer.GetPageRenderFunctionContextContainer();

            try
            {
                result = GetValue(functionContextContainer, out returnType);
            }
            catch (Exception ex)
            {
                XElement errorBoxHtml;
                if (!functionContextContainer.ProcessException(functionName, ex, LogTitle, out errorBoxHtml))
                {
                    throw;
                }

                result = errorBoxHtml;
                returnType = typeof(XElement);
            }

            if (result != null)
            {
                if (returnType == typeof(XElement) || returnType == typeof(XhtmlDocument))
                {
                    var element = ValueTypeConverter.Convert<XElement>(result);
                    var markup = new Markup(element, functionContextContainer);

                    Controls.Add(markup);
                }
                else if (typeof(Control).IsAssignableFrom(returnType))
                {
                    var control = (Control) result;

                    Controls.Add(control);
                }
                else if (result is IEnumerable<XNode>)
                {
                    var nodes = result as IEnumerable<XNode>;

                    foreach (XNode node in nodes)
                    {
                        if (node == null) continue;

                        if (node is XElement)
                        {
                            var markup = new Markup(node as XElement, functionContextContainer);

                            Controls.Add(markup);
                        }
                        else
                        {
                            Controls.Add(new LiteralControl(node.ToString()));
                        }
                        
                    }
                }
                else if (result is XAttribute)
                {
                    var parentControl = this.Parent as HtmlGenericControl;
                    if(parentControl != null)
                    {
                        var attr = (XAttribute) result;
                        parentControl.Attributes.Add(attr.Name.ToString(), attr.Value);
                    }
                    else
                    {
                        const string comment = @"<!-- Failed to add attribute, parent control should be of type HtmlGenericControl, check that runat=""server"" attribute is added -->";
                        Controls.Add(new LiteralControl(comment));
                    }
                }
                else 
                {
                    var str = result.ToString();

                    Controls.Add(new LiteralControl(str));
                }
            }

            base.OnInit(e);
        }

        private object GetValue(FunctionContextContainer functionContextContainer, out Type returnType)
        {
            string functionName = Name;

            IFunction function;

            if (!FunctionFacade.TryGetFunction(out function, functionName))
            {
                throw new InvalidOperationException("Invalid function name '{0}'".FormatWith(functionName));
            }

            returnType = function.ReturnType;

            IDictionary<string, object> parameters = parseParameters(functionContextContainer);

            VerifyParameterMatch(function, parameters);

            return ExecuteFunction(function, parameters, functionContextContainer);
        }

        /// <summary>
        /// Executes the function. Note that all the XhtmlParameters will have all the nested &gt;f:function /&lt; lazily evaluated
        /// </summary>
        private static object ExecuteFunction(IFunction function, IDictionary<string, object> parameters, FunctionContextContainer functionContextContainer )
        {
            List<BaseParameterRuntimeTreeNode> parameterNodes = new List<BaseParameterRuntimeTreeNode>();

            if (parameters != null)
            {
                foreach (KeyValuePair<string, object> kvp in parameters)
                {
                    var value = kvp.Value;
                    if (value is XhtmlDocument)
                    {
                        parameterNodes.Add(new LazyParameterRuntimeTreeNode(kvp.Key,
                            () => ExecuteNestedFunctions(value as XhtmlDocument, functionContextContainer)));
                    }
                    else
                    {
                        parameterNodes.Add(new ConstantObjectParameterRuntimeTreeNode(kvp.Key, kvp.Value));
                    }
                }
            }

            var treeNode = new FunctionRuntimeTreeNode(function, parameterNodes);

            return treeNode.GetValue(functionContextContainer);
        }

        private static XhtmlDocument ExecuteNestedFunctions(XhtmlDocument document, FunctionContextContainer functionContextContainer)
        {
            PageRenderer.ExecuteEmbeddedFunctions(document.Root, functionContextContainer);

            return document;
        }

        private static void VerifyParameterMatch(IFunction function, IDictionary<string, object> parameters)
        {
            var initializationInfo = function as IFunctionInitializationInfo;
            if(initializationInfo != null && !initializationInfo.FunctionInitializedCorrectly) return;
            
            foreach(string parameterName in parameters.Keys)
            {
                Verify.That(function.ParameterProfiles.Any(p => p.Name == parameterName),
                    "Function '{0}.{1}' does not have parameter '{2}' defined",
                    function.Namespace, function.Name, parameterName);
            }
        }

        private IDictionary<string, object> parseParameters(FunctionContextContainer functionContextContainer)
        {
            var result = new Dictionary<string, object>();

            foreach (Param param in Parameters)
            {
                param.DataBind();

                object value;

                if (param.Controls.Count == 1 && param.Controls[0] is Function)
                {
                    var nestedFunction = param.Controls[0] as Function;

                    Type returnType;
                    value = nestedFunction.GetValue(functionContextContainer, out returnType);
                }
                else
                {
                    value = param.Value;
                }

                result.Add(param.Name, value);
            }

            return result;
        }
    }
}