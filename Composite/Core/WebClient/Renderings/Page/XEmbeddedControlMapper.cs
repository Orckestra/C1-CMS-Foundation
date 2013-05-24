using System;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Xml.Linq;
using Composite.Core.Collections.Generic;
using Composite.Core.Xml;
using Composite.Core.Extensions;
using Composite.Functions;

namespace Composite.Core.WebClient.Renderings.Page
{
    internal sealed class XEmbeddedControlMapper : IFunctionResultToXEmbedableMapper, IXElementToControlMapper
	{
        private static readonly XName _markerElementName = Namespaces.AspNetControls + "marker";
        private static readonly XName _formElementName = Namespaces.AspNetControls + "form";
        private static readonly XName _placeholderElementName = Namespaces.AspNetControls + "placeholder";


        private readonly Hashtable<string, Control> _controls = new Hashtable<string, Control>();

        // IFunctionResultToXElementMapper
        public bool TryMakeXEmbedable(FunctionContextContainer contextContainer, object resultObject, out XNode resultElement)
        {
            var control = resultObject as Control;

            if (control == null)
            {
                resultElement = null;
                return false;
            }

            string controlMarkerKey;

            lock (_controls)
            {
                controlMarkerKey = string.Format("[Composite.Function.Render.Asp.Net.Control.{0}]", _controls.Count);
                _controls.Add(controlMarkerKey, control);
            }

            resultElement =
                XElement.Parse(@"<c1marker:{0} xmlns:c1marker=""{1}"" key=""{2}"" />"
                .FormatWith(_markerElementName.LocalName,
                            _markerElementName.Namespace,
                            controlMarkerKey));

            return true;
        }


        // IXElementToControlMapper
        public bool TryGetControlFromXElement(XElement element, out Control control)
        {
            if (element.Name.Namespace != Namespaces.AspNetControls)
            {
                control = null;
                return false;
            }
            
            if (element.Name == _markerElementName)
            {
                control = _controls[element.Attribute("key").Value];
                return true;
            }

            if (element.Name == _formElementName)
            {
                control = new HtmlForm();

                element.CopyAttributes(control as HtmlForm, false);

                foreach (var child in element.Nodes())
                {
                    control.Controls.Add(child.AsAspNetControl(this));
                }

                return true;
            }

            if (element.Name == _placeholderElementName)
            {
                control = new PlaceHolder();

                XAttribute idAttribute = element.Attribute("id");
                if (idAttribute != null)
                {
                    control.ID = idAttribute.Value;
                }

                foreach (var child in element.Nodes())
                {
                    control.Controls.Add(child.AsAspNetControl(this));
                }

                return true;
            }

            throw new InvalidOperationException(string.Format("Unhandled ASP.NET tag '{0}'.", element.Name));
        }
	}
}
