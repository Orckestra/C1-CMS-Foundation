using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Hosting;
using System.Workflow.Runtime;
using System.Xml.Linq;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Workflow;
using Composite.Core.Configuration;
using Composite.Core.ResourceSystem;

namespace Composite.C1Console.Tools
{
    public sealed partial class SetTimeZoneWorkflow : Workflow.Activities.FormsWorkflow
    {
        private const string TimezoneXslt = @"<?xml version=""1.0"" encoding=""utf-8""?>
                                                <xsl:stylesheet version=""1.0"" xmlns:xsl=""http://www.w3.org/1999/XSL/Transform"" 
                                                xmlns:msxsl=""urn:schemas-microsoft-com:xslt"" exclude-result-prefixes=""msxsl"">
                                                <xsl:param name = ""theTimezone"" select='""{0}""'/>
                                                  <xsl:output method = ""xml"" indent=""yes""/>
                                                  <xsl:template match = ""@* | node()"" >
                                                    <xsl:copy>
                                                      <xsl:apply-templates select = ""@* | node()""/>
                                                    </xsl:copy>
                                                  </xsl:template>
                                                  <xsl:template match = ""GlobalSettingsProviderPlugins/add/@timezone"">
                                                    <xsl:attribute name = ""timezone"">
                                                       <xsl:value-of select = ""$theTimezone""/>
                                                      </xsl:attribute>
                                                  </xsl:template>
                                                  <xsl:template match = ""GlobalSettingsProviderPlugins/add[not(@timezone)]"">
                                                    <xsl:copy>
		                                                <xsl:attribute name = ""timezone"" >
                                                            <xsl:value-of select = ""$theTimezone""/>
                                                         </xsl:attribute>
		                                                <xsl:apply-templates select = ""@*|node()""/>
                                                    </xsl:copy>
                                                  </xsl:template>
                                                </xsl:stylesheet>";
        public SetTimeZoneWorkflow()
        {
            InitializeComponent();
        }

        
        private void initializeCodeActivity_InitializeBindings_ExecuteCode(object sender, EventArgs e)
        {
            var tzs = TimeZoneInfo.GetSystemTimeZones().ToDictionary(systemTimeZone => systemTimeZone.Id, systemTimeZone => 
            StringResourceSystemFacade.GetString("Composite.Plugins.TimezoneDisplayNames",
                "TimezoneDisplayName." + systemTimeZone.Id));
            var bindings = new Dictionary<string, object>
            {
                {"TimeZones", tzs},
                {"TimeZonesSelected",GlobalSettingsFacade.TimeZone.Id }
            };

            Bindings = bindings;
        }



        private void sendMessageCodeActivity_SendMessage_ExecuteCode(object sender, EventArgs e)
        {
            CloseCurrentView();

            var timeZoneStandardName = GetBinding<string>("TimeZonesSelected");

            var timezoneId = TimeZoneInfo.FindSystemTimeZoneById(timeZoneStandardName);
            
            var timezoneTransform = XDocument.Parse(String.Format(TimezoneXslt, timezoneId.Id));

            ConfigurationServices.TransformConfiguration(timezoneTransform,false);

            HostingEnvironment.InitiateShutdown();

            FlowControllerServicesContainer flowControllerServicesContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
            IManagementConsoleMessageService managementConsoleMessageService = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();
            
            managementConsoleMessageService.ShowGlobalMessage(DialogType.Message,
                    StringResourceSystemFacade.GetString("Composite.Management", "SendMessageToConsolesWorkflow.SuccessMessage.TimezoneChangedTitle"),
                    StringResourceSystemFacade.GetString("Composite.Management", "SendMessageToConsolesWorkflow.SuccessMessage.TimezoneChangedMessage"));

            managementConsoleMessageService.RebootConsole();

        }
    }
}
