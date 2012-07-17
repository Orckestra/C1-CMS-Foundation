using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Xml.Linq;
using Composite.Core.Extensions;
using Composite.Core.Types;
using Composite.Core.Xml;
using Composite.Functions;

namespace Composite.Plugins.PageTemplates.MasterPages.Controls.F
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [PersistChildren(false)]
    [ParseChildren(true, "Parameters")]
    public class Function : Control
    {
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
            IFunction function;
            if (!FunctionFacade.TryGetFunction(out function, Name))
            {
                throw new InvalidOperationException("Invalid function name '{0}'".FormatWith("Name"));
            }

            var result = FunctionFacade.Execute<object>(function, parseParameters(), new FunctionContextContainer());

            if (result != null)
            {
                if (function.ReturnType == typeof (XElement) || function.ReturnType == typeof (XhtmlDocument))
                {
                    var element = ValueTypeConverter.Convert<XElement>(result);
                    var markup = new Markup(element);

                    Controls.Add(markup);
                }
                else if (typeof (Control).IsAssignableFrom(function.ReturnType))
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

                        Controls.Add(new LiteralControl(node.ToString()));
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

        private IDictionary<string, object> parseParameters()
        {
            var result = new Dictionary<string, object>();

            foreach (Param param in Parameters)
            {
                param.DataBind();

                result.Add(param.Name, param.Value);
            }

            return result;
        }
    }
}