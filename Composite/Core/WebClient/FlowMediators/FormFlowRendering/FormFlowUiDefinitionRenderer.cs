using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Xml;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Forms;
using Composite.C1Console.Forms.CoreUiControls;
using Composite.C1Console.Forms.Flows;
using Composite.C1Console.Forms.Flows.Foundation.PluginFacades;
using Composite.C1Console.Forms.WebChannel;
using Composite.Core.Logging;
using Composite.Core.ResourceSystem;
using Composite.Data.Validation.ClientValidationRules;


namespace Composite.Core.WebClient.FlowMediators.FormFlowRendering
{
    internal static class FormFlowUiDefinitionRenderer
    {
        public static IUiControl Render(
            string consoleId,
            string elementProviderName,
            FlowToken flowToken,
            FormFlowUiDefinition formFlowUiCommand,
            IFormChannelIdentifier channel,
            bool debugMode,
            FlowControllerServicesContainer servicesContainer)
        {
            FlowControllerServicesContainer formServicesContainer = new FlowControllerServicesContainer(servicesContainer);
            formServicesContainer.AddService(new FormFlowRenderingService());
            formServicesContainer.AddService(new FormFlowWebRenderingService());

            IFormMarkupProvider formMarkupProvider = formFlowUiCommand.MarkupProvider;
            IFormMarkupProvider customToolbarItemsMarkupProvider = formFlowUiCommand.CustomToolbarItemsMarkupProvider;
            Dictionary<string, object> innerFormBindings = formFlowUiCommand.BindingsProvider.GetBindings();
            Dictionary<IFormEventIdentifier, FormFlowEventHandler> eventHandlers = formFlowUiCommand.EventHandlers;
            Dictionary<string, List<ClientValidationRule>> bindingsValidationRules = formFlowUiCommand.BindingsValidationRules;

            FormTreeCompiler formCompiler = new FormTreeCompiler();
            IUiContainer renderingContainer = GetRenderingContainer(channel, formFlowUiCommand.UiContainerType);

            // Setting state related objects so the delegate below can access them "fresh"
            CurrentFormTreeCompiler = formCompiler;
            CurrentInnerFormBindings = innerFormBindings;
            CurrentControlContainer = (IWebUiContainer)renderingContainer;


            Dictionary<string, object> containerEventHandlerStubs = new Dictionary<string, object>();

            foreach (IFormEventIdentifier eventIdentifier in eventHandlers.Keys)
            {
                IFormEventIdentifier localScopeEventIdentifier = eventIdentifier;  // See: Local variable usage with anonymous methods within loop control structures

                EventHandler handlerStub = delegate(object sender, EventArgs e)
                {
                    try
                    {
                        FormTreeCompiler activeFormTreeCompiler = CurrentFormTreeCompiler;
                        Dictionary<string, object> activeInnerFormBindings = CurrentInnerFormBindings;

                        FormFlowEventHandler handler = eventHandlers[localScopeEventIdentifier];
                        activeFormTreeCompiler.SaveControlProperties();
                        handler.Invoke(flowToken, activeInnerFormBindings, formServicesContainer);

                        if (formServicesContainer.GetService<IManagementConsoleMessageService>().CloseCurrentViewRequested == true)
                        {
                            ViewTransitionHelper.HandleCloseCurrentView(formFlowUiCommand.UiContainerType);
                        }
                        else
                        {
                            FormFlowRenderingService formFlowService = (FormFlowRenderingService)formServicesContainer.GetService<IFormFlowRenderingService>();
                            bool replacePageOutput = (formServicesContainer.GetService<IFormFlowWebRenderingService>().NewPageOutput != null);

                            bool rerenderView = (formFlowService.RerenderViewRequested == true);
                            if (formFlowService.BindingPathedMessages != null)
                            {
                                ShowFieldMessages(CurrentControlTreeRoot, formFlowService.BindingPathedMessages, CurrentControlContainer, servicesContainer);
                            }

                            List<bool> boolCounterList = new List<bool> { replacePageOutput, rerenderView };

                            if (boolCounterList.Where(f => f == true).Count() > 1)
                            {
                                StringBuilder sb = new StringBuilder("Flow returned conflicting directives for post handling:\n");
                                if (replacePageOutput == true) sb.AppendLine(" - Replace page output with new web control.");
                                if (rerenderView == true) sb.AppendLine(" - Rerender view.");

                                throw new InvalidOperationException(sb.ToString());
                            }

                            if (rerenderView == true)
                            {
                                LoggingService.LogVerbose("FormFlowRendering", "Re-render requested");
                                IFlowUiDefinition newFlowUiDefinition = FlowControllerFacade.GetCurrentUiDefinition(flowToken, servicesContainer);
                                if (typeof(FlowUiDefinitionBase).IsAssignableFrom(newFlowUiDefinition.GetType()) == false)
                                    throw new NotImplementedException("Unable to handle transitions to ui definition of type " + newFlowUiDefinition.GetType());
                                ViewTransitionHelper.HandleRerender(consoleId, elementProviderName, flowToken, formFlowUiCommand, (FlowUiDefinitionBase)newFlowUiDefinition, servicesContainer);
                            }

                            if (replacePageOutput == true)
                            {
                                LoggingService.LogVerbose("FormFlowRendering", "Replace pageoutput requested");
                                IFormFlowWebRenderingService webRenderingService = formServicesContainer.GetService<IFormFlowWebRenderingService>();
                                Control newPageOutput = webRenderingService.NewPageOutput;

                                foreach (Control control in GetNestedControls(newPageOutput).Where(f => f is ScriptManager).ToList())
                                {
                                    control.Parent.Controls.Remove(control);
                                }

                                Page currentPage = HttpContext.Current.Handler as Page;

                                HtmlHead newHeadControl = GetNestedControls(newPageOutput).Where(f => f is HtmlHead).FirstOrDefault() as HtmlHead;

                                HtmlHead oldHeadControl = currentPage.Header;

                                ControlCollection headContainer = null;
                                bool headersHasToBeSwitched = newHeadControl != null && oldHeadControl != null;
                                if (headersHasToBeSwitched)
                                {
                                    headContainer = newHeadControl.Parent.Controls;
                                    headContainer.Remove(newHeadControl);
                                }

                                currentPage.Controls.Clear();
                                if (string.IsNullOrEmpty(webRenderingService.NewPageMimeType))
                                {
                                    currentPage.Response.ContentType = "text/html";
                                }
                                else
                                {
                                    currentPage.Response.ContentType = webRenderingService.NewPageMimeType;
                                }
                                currentPage.Controls.Add(newPageOutput);

                                if (headersHasToBeSwitched)
                                {
                                    oldHeadControl.Controls.Clear();
                                    oldHeadControl.InnerHtml = "";
                                    oldHeadControl.InnerText = "";
                                    if (newHeadControl.ID != null)
                                    {
                                        oldHeadControl.ID = newHeadControl.ID;
                                    }
                                    oldHeadControl.Title = newHeadControl.Title;

                                    headContainer.AddAt(0, oldHeadControl);

                                    foreach (Control c in newHeadControl.Controls.Cast<Control>().ToList())
                                    {
                                        oldHeadControl.Controls.Add(c);
                                    }
                                }
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        formServicesContainer.GetService<IManagementConsoleMessageService>().ShowLogEntry(typeof(FormFlowUiDefinitionRenderer), ex);
                        throw ex;
                    }
                };

                containerEventHandlerStubs.Add(eventIdentifier.BindingName, handlerStub);

                if (innerFormBindings.ContainsKey(eventIdentifier.BindingName) == true)
                {
                    innerFormBindings.Remove(eventIdentifier.BindingName);
                }

                innerFormBindings.Add(eventIdentifier.BindingName, handlerStub);
            }

            using (XmlReader formMarkupReader = formMarkupProvider.GetReader())
            {
                formCompiler.Compile(formMarkupReader, channel, innerFormBindings, debugMode, bindingsValidationRules);
            }
            IUiControl innerForm = formCompiler.UiControl;

            IUiControl customToolbarItems = null;
            if (customToolbarItemsMarkupProvider != null)
            {
                FormTreeCompiler toolbarCompiler = new FormTreeCompiler();
                using (XmlReader formMarkupReader = customToolbarItemsMarkupProvider.GetReader())
                {
                    toolbarCompiler.Compile(formMarkupReader, channel, innerFormBindings, debugMode, bindingsValidationRules);
                }
                customToolbarItems = toolbarCompiler.UiControl;
            }

            CurrentControlTreeRoot = (IWebUiControl)innerForm;

            string containerLabel = formCompiler.Label ?? formFlowUiCommand.ContainerLabel;
            ResourceHandle containerIcon = formCompiler.Icon;

            return renderingContainer.Render(formCompiler.UiControl, customToolbarItems, channel, containerEventHandlerStubs, containerLabel, containerIcon);
        }



        private static IUiContainer GetRenderingContainer(IFormChannelIdentifier channel, IFlowUiContainerType containerIdentifier)
        {
            return UiContainerFactoryFactoryPluginFacade.CreateContainer(channel, containerIdentifier);
        }



        private static readonly string _formTreeCompilerLookupKey = typeof(FormFlowUiDefinitionRenderer).FullName + "FormTreeCompiler";
        private static readonly string _innerFormBindingsLookupKey = typeof(FormFlowUiDefinitionRenderer).FullName + "InnerFormBindings";
        private static readonly string _currentControlTreeRoot = typeof(FormFlowUiDefinitionRenderer).FullName + "ControlTreeRoot";
        private static readonly string _currentControlContainer = typeof(FormFlowUiDefinitionRenderer).FullName + "ControlContainer";



        private static FormTreeCompiler CurrentFormTreeCompiler
        {
            get { return HttpContext.Current.Items[_formTreeCompilerLookupKey] as FormTreeCompiler; }
            set { HttpContext.Current.Items[_formTreeCompilerLookupKey] = value; }
        }

        private static Dictionary<string, object> CurrentInnerFormBindings
        {
            get { return HttpContext.Current.Items[_innerFormBindingsLookupKey] as Dictionary<string, object>; }
            set { HttpContext.Current.Items[_innerFormBindingsLookupKey] = value; }
        }

        private static IWebUiControl CurrentControlTreeRoot
        {
            get { return HttpContext.Current.Items[_currentControlTreeRoot] as IWebUiControl; }
            set { HttpContext.Current.Items[_currentControlTreeRoot] = value; }
        }
        private static IWebUiContainer CurrentControlContainer
        {
            get { return HttpContext.Current.Items[_currentControlContainer] as IWebUiContainer; }
            set { HttpContext.Current.Items[_currentControlContainer] = value; }
        }




        private static void ShowFieldMessages(IWebUiControl webUiControlTreeRoot, Dictionary<string, string> bindingPathedMessages, IWebUiContainer container, FlowControllerServicesContainer servicesContainer)
        {
            Dictionary<string, string> pathToClientIDMappings = new Dictionary<string, string>();
            ResolveBindingPathToCliendIDMappings(webUiControlTreeRoot, pathToClientIDMappings);

            Dictionary<string, string> cliendIDPathedMessages = new Dictionary<string, string>();
            Dictionary<string, string> homelessMessages = new Dictionary<string, string>();

            foreach (var msgElement in bindingPathedMessages)
            {
                string clientId = null;

                if (pathToClientIDMappings.TryGetValue(msgElement.Key, out clientId) == true)
                {
                    cliendIDPathedMessages.Add(clientId, msgElement.Value);
                }
                else
                {
                    homelessMessages.Add(msgElement.Key, msgElement.Value);
                }
            }

            container.ShowFieldMessages(cliendIDPathedMessages);

            if (homelessMessages.Count > 0)
            {
                StringBuilder sb = new StringBuilder();

                foreach (var msgElement in homelessMessages)
                {
                    sb.AppendFormat("{0}: {1}\n", msgElement.Key, msgElement.Value);
                }

                var consoleMsgService = servicesContainer.GetService<IManagementConsoleMessageService>();
                consoleMsgService.ShowMessage(DialogType.Warning, "Field messages", sb.ToString());
            }
        }


        private static void ResolveBindingPathToCliendIDMappings(IWebUiControl webUiControl, Dictionary<string, string> resolvedMappings)
        {
            if (webUiControl is ContainerUiControlBase)
            {
                ContainerUiControlBase container = (ContainerUiControlBase)webUiControl;
                foreach (IUiControl child in container.UiControls)
                {
                    ResolveBindingPathToCliendIDMappings((IWebUiControl)child, resolvedMappings);
                }
            }

            if (webUiControl.SourceBindingPaths != null && webUiControl.ClientName != null && webUiControl.SourceBindingPaths.Count > 0)
            {
                foreach (string sourceBindingPath in webUiControl.SourceBindingPaths)
                {
                    resolvedMappings.Add(sourceBindingPath, webUiControl.ClientName);
                }
            }
        }


        private static IEnumerable<Control> GetNestedControls(Control control)
        {
            foreach (Control child in control.Controls)
            {
                yield return child;

                foreach (Control nested in GetNestedControls(child))
                {
                    yield return nested;
                }
            }
        }
    }
}
