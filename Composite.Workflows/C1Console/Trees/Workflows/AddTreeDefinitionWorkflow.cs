using System;
using System.Collections.Generic;
using System.IO;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.C1Console.Workflow;


namespace Composite.C1Console.Trees.Workflows
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddTreeDefinitionWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public AddTreeDefinitionWorkflow()
        {
            InitializeComponent();
        }



        private void initializeCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            this.Bindings.Add("DefinitionName", "");

            this.Bindings.Add("TemplatesList", new Dictionary<string, string> {
                { "Empty", "Empty" },
                { "Folder grouping", "Folder grouping" },
                { "Parent filtering", "Parent filtering" }
            });
            this.Bindings.Add("TemplateName", "Empty");

            this.Bindings.Add("PositionsList", new Dictionary<string, string> {
                  { "Content", "Content" },
                  { "Media", "Media" },
                  { "Layout", "Layout" },
                  { "Data", "Data" },
                  { "Function", "Function" },
                  { "User", "User" },
                  { "System", "System" },
                  { "PerspectivesRoot", "PerspectivesRoot" }
            });
            this.Bindings.Add("PositionName", "Content");
        }



        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            string definitionName = this.GetBinding<string>("DefinitionName");
            string templateName = this.GetBinding<string>("TemplateName");
            string positionName = this.GetBinding<string>("PositionName");

            string template;

            switch (templateName)
            {
                case "Empty":
                    template = string.Format(@"<?xml version=""1.0"" encoding=""UTF-8""?>
<ElementStructure xmlns=""http://http://www.composite.net/ns/management/trees/treemarkup/1.0"" xmlns:f=""http://www.composite.net/ns/function/1.0"">

  <ElementStructure.AutoAttachments>
    <NamedParent Name=""{0}"" Position=""Top""/>
  </ElementStructure.AutoAttachments>

  <ElementRoot>
    <Children>      
        <Element Label=""Simple tree"" Id=""SimpleTree"" />
    </Children>
  </ElementRoot>
</ElementStructure>", positionName);
                    break;

                case "Folder grouping":
                    template = string.Format(@"<?xml version=""1.0"" encoding=""UTF-8""?>
<ElementStructure xmlns=""http://http://www.composite.net/ns/management/trees/treemarkup/1.0"" xmlns:f=""http://www.composite.net/ns/function/1.0"">


  <ElementStructure.AutoAttachments>
    <NamedParent Name=""{0}"" Position=""Top""/>
  </ElementStructure.AutoAttachments>

  <ElementRoot>
    <Children>      
      <Element Label=""My DSL Tree Demo"" Id=""FolderGroupingId1"">
        <Children>
          <Element Label=""Simple Element"" Id=""FolderGroupingId2"">            
            <Children>              
              <DataFolderElements Type=""Composite.Data.Types.IPage"" FieldGroupingName=""ChangeDate"" DateFormat=""yyyy - MMMM"">
                <Children>
                  <DataFolderElements FieldGroupingName=""Abstract"">
                    <Children>
                      <DataElements Type=""Composite.Data.Types.IPage"">
                      </DataElements>
                    </Children>
                  </DataFolderElements>
                </Children>
              </DataFolderElements>
            </Children>
          </Element>
        </Children>
      </Element>
    </Children>
  </ElementRoot>
</ElementStructure>", positionName);
                    break;

                case "Parent filtering":
                    template = string.Format(@"<?xml version=""1.0"" encoding=""UTF-8""?>
<ElementStructure xmlns=""http://http://www.composite.net/ns/management/trees/treemarkup/1.0"" xmlns:f=""http://www.composite.net/ns/function/1.0"">


  <ElementStructure.AutoAttachments>
    <NamedParent Name=""{0}"" Position=""Top""/>
  </ElementStructure.AutoAttachments>

  <ElementRoot>
    <Children>      
      <Element Label=""My DSL Tree Demo"" Id=""ParentFilteringId1"">
        <Children>
          <Element Label=""Simple Element"" Id=""ParentFilteringId2"">            
            <Children>              
              <DataElements Type=""Composite.Data.Types.IPageTemplate"">
                <Children>
                  <DataElements Type=""Composite.Data.Types.IPage"">
                    <Filters>
                      <ParentIdFilter ParentType=""Composite.Data.Types.IPageTemplate"" ReferenceFieldName=""TemplateId"" />
                    </Filters>
                  </DataElements>
                </Children>
              </DataElements>
            </Children>
          </Element>
        </Children>
      </Element>
    </Children>
  </ElementRoot>
</ElementStructure>", positionName);
                    break;

                default:
                    throw new InvalidOperationException();
            }


            string filename = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.TreeDefinitionsDirectory), definitionName + ".xml");

            File.WriteAllText(filename, template);

            this.RefreshRootEntityToken();
        }



        private void IsTreeIdFree(object sender, System.Workflow.Activities.ConditionalEventArgs e)
        {
            string definitionName = this.GetBinding<string>("DefinitionName");

            string filename = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.TreeDefinitionsDirectory), definitionName + ".xml");

            e.Result = File.Exists(filename) == false;

            if (e.Result == false)
            {
                this.ShowFieldMessage("DefinitionName", "Definition name is already used");
            }
        }
    }
}
