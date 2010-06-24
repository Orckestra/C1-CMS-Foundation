using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using Composite.Functions;
using System.Xml.Linq;
using Composite.ConsoleEventSystem.Foundation;
using Composite.ConsoleEventSystem;
using Composite.Functions.Foundation;
using System.Collections.Generic;

public partial class Spikes_BackendStatus_Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Dump_IFunctions();
        Dump_IWidgetFunctions();
        Dump_ConsoleMessageQueue();
    }



    private void Dump_IFunctions()
    {
        InfoPlaceholder.Controls.Add(new LiteralControl("<h1>IFunctions:</h1>"));

        InfoPlaceholder.Controls.Add(new LiteralControl("<table border=\"0\">"));

        foreach (string functionName in FunctionFacade.FunctionNames)
        {
            InfoPlaceholder.Controls.Add(new LiteralControl("<tr><td>"));

            IFunction function = FunctionFacade.GetFunction(functionName);

            XElement supprotedTypesMarkup =
                new XElement("ul",
                    from type in new List<Type> { function.ReturnType }
                    select new XElement("li", type.ToString())
               );

            XElement parameterProfilesMarkup =
                new XElement("table", new XAttribute("border", "1"),
                        new XElement("tr", new XElement("th", "name"), new XElement("th", "type")),
                        from profile in function.ParameterProfiles
                        select new XElement("tr",
                                  new XElement("td", profile.Name),
                                  new XElement("td", profile.Type.ToString())
                            )
                   );


            XElement functionMarkup =
                new XElement("table", new XAttribute("border", "1"), new XAttribute("width", "100%"),
                    new XElement("tr",
                        new XElement("td", new XAttribute("valign", "top"), functionName),
                        new XElement("td",
                            new XElement("table", new XAttribute("border", "1"), new XAttribute("width", "100%"),
                                new XElement("tr",
                                    new XElement("td", new XAttribute("valign", "top"), "Supported types"),
                                    new XElement("td", new XAttribute("valign", "top"), supprotedTypesMarkup)
                                ),
                                new XElement("tr",
                                    new XElement("td", new XAttribute("valign", "top"), "Parameters"),
                                    new XElement("td", parameterProfilesMarkup)
                                )
                            )
                        )
                    )
                );


            InfoPlaceholder.Controls.Add(new LiteralControl(functionMarkup.ToString()));

            InfoPlaceholder.Controls.Add(new LiteralControl("</td></tr>"));
        }

        InfoPlaceholder.Controls.Add(new LiteralControl("</table>"));
    }



    private void Dump_IWidgetFunctions()
    {
        InfoPlaceholder.Controls.Add(new LiteralControl("<h1>IWidgetFunctions:</h1>"));

        InfoPlaceholder.Controls.Add(new LiteralControl("<table border=\"0\">"));

        foreach (string widgetFunctionName in FunctionFacade.WidgetFunctionNames)
        {
            InfoPlaceholder.Controls.Add(new LiteralControl("<tr><td>"));

            IWidgetFunction function = FunctionFacade.GetWidgetFunction(widgetFunctionName);

            XElement supprotedTypesMarkup =
                new XElement("ul",
                    from type in new List<Type> { function.ReturnType }
                    select new XElement("li", type.ToString())
               );

            XElement parameterProfilesMarkup =
                new XElement("table", new XAttribute("border", "1"),
                        new XElement("tr", new XElement("th", "name"), new XElement("th", "type")),
                        from profile in function.ParameterProfiles
                        select new XElement("tr",
                                  new XElement("td", profile.Name),
                                  new XElement("td", profile.Type.ToString()))
                   );


            XElement functionMarkup =
                new XElement("table", new XAttribute("border", "1"), new XAttribute("width", "100%"),
                    new XElement("tr",
                        new XElement("td", new XAttribute("valign", "top"), widgetFunctionName),
                        new XElement("td",
                            new XElement("table", new XAttribute("border", "1"), new XAttribute("width", "100%"),
                                new XElement("tr",
                                    new XElement("td", new XAttribute("valign", "top"), "Supported types"),
                                    new XElement("td", new XAttribute("valign", "top"), supprotedTypesMarkup)
                                ),
                                new XElement("tr",
                                    new XElement("td", new XAttribute("valign", "top"), "Parameters"),
                                    new XElement("td", parameterProfilesMarkup)
                                )
                            )
                        )
                    )
                );


            InfoPlaceholder.Controls.Add(new LiteralControl(functionMarkup.ToString()));

            InfoPlaceholder.Controls.Add(new LiteralControl("</td></tr>"));
        }

        InfoPlaceholder.Controls.Add(new LiteralControl("</table>"));
    }


    private void Dump_ConsoleMessageQueue()
    {
        InfoPlaceholder.Controls.Add(new LiteralControl("<h1>ConsoleMessageQueue messages:</h1>"));

        XElement tableElement = new XElement("table", new XAttribute("border", "1"));

        tableElement.Add(
                new XElement("tr",
                    new XElement("th", "Queue number"),
                    new XElement("th", "Console id"),
                    new XElement("th", "Enqueue time"),
                    new XElement("th", "Queue item type"),
                    new XElement("th", "Queue item")
                ));

        foreach (ConsoleMessageQueueElement queueElement in ConsoleMessageQueueFacade.GetQueueElements(1, null))
        {
            tableElement.Add(
                new XElement("tr",
                    new XElement("td", queueElement.QueueItemNumber), 
                    new XElement("td", (queueElement.ReceiverConsoleId == null) ? "All" : queueElement.ReceiverConsoleId), 
                    new XElement("td", queueElement.EnqueueTime),
                    new XElement("td", queueElement.QueueItem.GetType()),
                    new XElement("td", queueElement.QueueItem.ToString())
                ));
        }

        InfoPlaceholder.Controls.Add(new LiteralControl(tableElement.ToString()));
    }
}
