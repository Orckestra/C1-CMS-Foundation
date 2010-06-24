using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using Composite.Data;
using Composite.Data.Types;

public partial class Spikes_Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        using (DataScope dataScope = new DataScope(DataScopeIdentifier.Public))
        {
            // ... code here will run in CultureInvariant data scope
        }
        /*var datas = DataFacade.GetData<Maw.MAWTEST01>(); //.Where( f=>f.NewField.Contains("hej"));

        foreach (var data in datas)
        {
            Calendar c = new Calendar();
            dataPlaceholder.Controls.Add(c);

            if (string.IsNullOrEmpty(data.FavoritePage) == false)
            {
                DataReference<IImageFile> imageRef = new DataReference<IImageFile>(data.FavoritePage);


                if (imageRef.Data.CreationTime.HasValue == true)
                {
                    c.SelectedDate = imageRef.Data.CreationTime.Value;
                }
            }
        }*/
    }
}
