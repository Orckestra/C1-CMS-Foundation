using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Xml;
using System.Xml.Linq;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Forms;
using Composite.C1Console.Forms.CoreUiControls;
using Composite.C1Console.Forms.Flows;
using Composite.C1Console.Forms.Flows.Foundation.PluginFacades;
using Composite.C1Console.Forms.WebChannel;
using Composite.Core.Extensions;
using Composite.Core.ResourceSystem;
using Composite.Core.Xml;
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
                        BaseEventHandler(consoleId, elementProviderName, flowToken, formFlowUiCommand, servicesContainer, eventHandlers, localScopeEventIdentifier, formServicesContainer);
                    }
                    catch (Exception ex)
                    {
                        formServicesContainer.GetService<IManagementConsoleMessageService>().ShowLogEntry(typeof(FormFlowUiDefinitionRenderer), ex);
                        throw;
                    }
                };

                containerEventHandlerStubs.Add(eventIdentifier.BindingName, handlerStub);

                if (innerFormBindings.ContainsKey(eventIdentifier.BindingName))
                {
                    innerFormBindings.Remove(eventIdentifier.BindingName);
                }

                innerFormBindings.Add(eventIdentifier.BindingName, handlerStub);
            }

            XDocument document;

            using (XmlReader formMarkupReader = formMarkupProvider.GetReader())
            {
                document = XDocument.Load(formMarkupReader);
                formMarkupReader.Close();
            }

            formCompiler.Compile(document, channel, innerFormBindings, debugMode, "", bindingsValidationRules);

            IUiControl innerForm = formCompiler.UiControl;

            IUiControl customToolbarItems = null;
            if (customToolbarItemsMarkupProvider != null)
            {
                var toolbarCompiler = new FormTreeCompiler();
                CurrentCustomToolbarFormTreeCompiler = toolbarCompiler;

                using (XmlReader formMarkupReader = customToolbarItemsMarkupProvider.GetReader())
                {
                    toolbarCompiler.Compile(formMarkupReader, channel, innerFormBindings, debugMode, bindingsValidationRules);
                }
                customToolbarItems = toolbarCompiler.UiControl;
            }

            CurrentControlTreeRoot = (IWebUiControl)innerForm;

            string label = formCompiler.Label;
            if(label.IsNullOrEmpty())
            {
                label = formFlowUiCommand.ContainerLabel ?? "";
            }

            string labelField = GetFormLabelField(document);
            ResourceHandle containerIcon = formCompiler.Icon;

            return renderingContainer.Render(formCompiler.UiControl, customToolbarItems, channel, containerEventHandlerStubs, label, labelField, formCompiler.Tooltip, containerIcon);
        }

        private static void BaseEventHandler(string consoleId, 
                                             string elementProviderName, 
                                             FlowToken flowToken,
                                             FormFlowUiDefinition formFlowUiCommand,
                                             FlowControllerServicesContainer servicesContainer, 
                                             Dictionary<IFormEventIdentifier, FormFlowEventHandler> eventHandlers,
                                             IFormEventIdentifier localScopeEventIdentifier,
                                             FlowControllerServicesContainer formServicesContainer)
        {
            FormTreeCompiler activeFormTreeCompiler = CurrentFormTreeCompiler;
            Dictionary<string, object> activeInnerFormBindings = CurrentInnerFormBindings;

            FormFlowEventHandler handler = eventHandlers[localScopeEventIdentifier];
            Dictionary<string, Exception> bindingErrors = activeFormTreeCompiler.SaveAndValidateControlProperties();

            FormTreeCompiler activeCustomToolbarFormTreeCompiler = CurrentCustomToolbarFormTreeCompiler;
            if (activeCustomToolbarFormTreeCompiler != null)
            {
                var toolbarBindingErrors = activeCustomToolbarFormTreeCompiler.SaveAndValidateControlProperties();
                foreach (var pair in toolbarBindingErrors)
                {
                    bindingErrors.Add(pair.Key, pair.Value);
                }
            }

            formServicesContainer.AddService(new BindingValidationService(bindingErrors));

            handler.Invoke(flowToken, activeInnerFormBindings, formServicesContainer);

            if (formServicesContainer.GetService<IManagementConsoleMessageService>().CloseCurrentViewRequested)
            {
                ViewTransitionHelper.HandleCloseCurrentView(formFlowUiCommand.UiContainerType);
                return;
            }
            
            var formFlowService = formServicesContainer.GetService<IFormFlowRenderingService>();
            bool replacePageOutput = (formServicesContainer.GetService<IFormFlowWebRenderingService>().NewPageOutput != null);

            bool rerenderView = formFlowService.RerenderViewRequested;
            if (formFlowService.BindingPathedMessages != null)
            {
                ShowFieldMessages(CurrentControlTreeRoot, formFlowService.BindingPathedMessages, CurrentControlContainer,
                                    servicesContainer);
            }

            List<bool> boolCounterList = new List<bool> {replacePageOutput, rerenderView};

            if (boolCounterList.Count(f => f) > 1)
            {
                StringBuilder sb = new StringBuilder("Flow returned conflicting directives for post handling:\n");
                if (replacePageOutput) sb.AppendLine(" - Replace page output with new web control.");
                if (rerenderView) sb.AppendLine(" - Rerender view.");

                throw new InvalidOperationException(sb.ToString());
            }

            if (rerenderView)
            {
                Log.LogVerbose("FormFlowRendering", "Re-render requested");
                IFlowUiDefinition newFlowUiDefinition = FlowControllerFacade.GetCurrentUiDefinition(flowToken,
                                                                                                    servicesContainer);
                if (!(newFlowUiDefinition is FlowUiDefinitionBase))
                    throw new NotImplementedException("Unable to handle transitions to ui definition of type " +
                                                        newFlowUiDefinition.GetType());
                ViewTransitionHelper.HandleRerender(consoleId, elementProviderName, flowToken, formFlowUiCommand,
                                                    (FlowUiDefinitionBase) newFlowUiDefinition, servicesContainer);
            }

            if (replacePageOutput)
            {
                Log.LogVerbose("FormFlowRendering", "Replace pageoutput requested");
                IFormFlowWebRenderingService webRenderingService =
                    formServicesContainer.GetService<IFormFlowWebRenderingService>();
                Control newPageOutput = webRenderingService.NewPageOutput;

                foreach (Control control in GetNestedControls(newPageOutput).Where(f => f is ScriptManager).ToList())
                {
                    control.Parent.Controls.Remove(control);
                }

                Page currentPage = HttpContext.Current.Handler as Page;

                HtmlHead newHeadControl = GetNestedControls(newPageOutput).FirstOrDefault(f => f is HtmlHead) as HtmlHead;

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

        private static string GetFormLabelField(XDocument formMarkup)
        {
            var labelElement = formMarkup.Descendants(Namespaces.BindingForms10 + "layout.label").FirstOrDefault() 
                            ?? formMarkup.Descendants().FirstOrDefault(e => e.Name.LocalName == "TabPanels.Label");

            var readBinding = labelElement?.Element(Namespaces.BindingForms10 + "read");
            if(readBinding == null) return null;

            return (string)readBinding.Attribute("source");
        }

        private static IUiContainer GetRenderingContainer(IFormChannelIdentifier channel, IFlowUiContainerType containerIdentifier)
        {
            return UiContainerFactoryFactoryPluginFacade.CreateContainer(channel, containerIdentifier);
        }



        private static readonly string _formTreeCompilerLookupKey = typeof(FormFlowUiDefinitionRenderer).FullName + "FormTreeCompiler";
        private static readonly string _customToolbarFormTreeCompilerLookupKey = typeof(FormFlowUiDefinitionRenderer).FullName + "CustomToolbarFormTreeCompiler";
        private static readonly string _innerFormBindingsLookupKey = typeof(FormFlowUiDefinitionRenderer).FullName + "InnerFormBindings";
        private static readonly string _currentControlTreeRoot = typeof(FormFlowUiDefinitionRenderer).FullName + "ControlTreeRoot";
        private static readonly string _currentControlContainer = typeof(FormFlowUiDefinitionRenderer).FullName + "ControlContainer";



        private static FormTreeCompiler CurrentFormTreeCompiler
        {
            get { return HttpContext.Current.Items[_formTreeCompilerLookupKey] as FormTreeCompiler; }
            set { HttpContext.Current.Items[_formTreeCompilerLookupKey] = value; }
        }

        private static FormTreeCompiler CurrentCustomToolbarFormTreeCompiler
        {
            get { return HttpContext.Current.Items[_customToolbarFormTreeCompilerLookupKey] as FormTreeCompiler; }
            set { HttpContext.Current.Items[_customToolbarFormTreeCompilerLookupKey] = value; }
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
            var pathToClientIDMappings = new Dictionary<string, string>();
            ResolveBindingPathToClientIDMappings(webUiControlTreeRoot, pathToClientIDMappings);

            var cliendIDPathedMessages = new Dictionary<string, string>();
            var homelessMessages = new Dictionary<string, string>();

            foreach (var msgElement in bindingPathedMessages)
            {
                string clientId = null;

                if (pathToClientIDMappings.TryGetValue(msgElement.Key, out clientId))
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


        internal static void ResolveBindingPathToClientIDMappings(IWebUiControl webUiControl, Dictionary<string, string> resolvedMappings)
        {
            var container = webUiControl as ContainerUiControlBase;
            if (container != null)
            {
                foreach (IUiControl child in container.UiControls)
                {
                    ResolveBindingPathToClientIDMappings((IWebUiControl)child, resolvedMappings);
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
