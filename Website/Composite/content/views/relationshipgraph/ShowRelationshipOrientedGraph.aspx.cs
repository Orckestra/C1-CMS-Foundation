using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.UI;
using Composite.C1Console.Security;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.Types;


namespace Composite.content.views.relationshipgraph
{
    public partial class ShowRelationshipOrientedGraph : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string idString = Request.QueryString["Id"];
            if (string.IsNullOrEmpty(idString) == true)
            {
                return;
            }

            Guid id = new Guid(idString);
            string filename = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.TempDirectory), string.Format("{0}.RelationshipGraph", id));

            EntityToken startEntityToken = EntityTokenSerializer.Deserialize(C1File.ReadAllLines(filename)[0]);

            RelationshipOrientedGraph graph = new RelationshipOrientedGraph(startEntityToken);

            IEnumerable<IEnumerable<EntityToken>> paths = graph.Root.GetAllPaths();

            RelationshipOrientedGraphPlaceHolder.Controls.Add(new LiteralControl(string.Format("<div><b>Path count: {0}</b></div>", paths.Count())));

            int pathCounter = 1;
            foreach (IEnumerable<EntityToken> path in paths)
            {
                EntityTokenHtmlPrettyfierHelper helper = new EntityTokenHtmlPrettyfierHelper();
                helper.StartTable();
                                
                helper.AddHeading(string.Format("<b>Path: {0}</b>", pathCounter++));                

                int levelCounter = 0;
                foreach (EntityToken entityToken in path)
                {
                    helper.StartRow();
                    helper.AddCell(string.Format("<center><b>Level: {0}</b></center>", levelCounter++), 2, "#aaaaaa");
                    helper.EndRow();

                    helper.StartRow();
                    helper.AddCell("<b>Id</b>");
                    helper.AddCell(entityToken.OnGetIdPrettyHtml());
                    helper.EndRow();

                    helper.StartRow();
                    helper.AddCell("<b>Type</b>");
                    helper.AddCell(entityToken.OnGetTypePrettyHtml());
                    helper.EndRow();

                    helper.StartRow();
                    helper.AddCell("<b>Source</b>");
                    helper.AddCell(entityToken.OnGetSourcePrettyHtml());                    
                    helper.EndRow();

                    string extra = entityToken.OnGetExtraPrettyHtml();
                    if (string.IsNullOrEmpty(extra) == false)
                    {
                        helper.StartRow();
                        helper.AddCell("<b>Extra</b>");
                        helper.AddCell(extra);
                        helper.EndRow();
                    }

                    helper.StartRow();
                    helper.AddCell("<b>RTT</b>");
                    helper.AddCell(TypeManager.SerializeType(entityToken.GetType()));
                    helper.EndRow();
                }                                                
                
                helper.EndTable();

                RelationshipOrientedGraphPlaceHolder.Controls.Add(new LiteralControl(helper.GetResult()));
            }
        }        
    }
}