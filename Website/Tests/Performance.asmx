<%@ WebService Language="C#" Class="Performance" %>

using System;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Collections.Generic;
using System.IO;
using System.Globalization;
using System.Security.Cryptography;
using Composite.Data;
using Composite.Data.Types;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.C1Console.Users;
using Composite.Core.PackageSystem;
using Composite.Data.DynamicTypes;
using Composite.Core.WebClient;
using Composite.Core.IO;



[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
public class Performance : System.Web.Services.WebService
{



    [WebMethod]
    public int GetRootPages()
    {
        UserValidationFacade.FormValidateUser("admin", "123456");

        using (new DataScope(DataScopeIdentifier.Administrated, UserSettings.ActiveLocaleCultureInfo))
        {
            Element contentElement = ElementFacade.GetRoots(new ElementProviderHandle("PageElementProvider"), null).ToList()[0];

            List<Element> rootPages = ElementFacade.GetChildren(contentElement.ElementHandle, null).ToList();

            return rootPages.Count;
        }
    }



    [WebMethod]
    public int GetAllPages()
    {
        UserValidationFacade.FormValidateUser("admin", "123456");

        using (new DataScope(DataScopeIdentifier.Administrated, UserSettings.ActiveLocaleCultureInfo))
        {
            Element contentElement = ElementFacade.GetRoots(new ElementProviderHandle("PageElementProvider"), null).ToList()[0];

            List<Element> rootPages = ElementFacade.GetChildren(contentElement.ElementHandle, null).ToList();

            int count = rootPages.Count;
            foreach (Element rootPage in rootPages)
            {
                count += GetAllPages(rootPage.ElementHandle);
            }

            return count;
        }
    }



    [WebMethod]
    public void ResetAspNetControls()
    {
        foreach (string path in ControlCompilerService.GetControlPaths())
        {
            string resolvedPath = PathUtil.Resolve(path);

            FileEx.RemoveReadOnly(resolvedPath);

            string content = File.ReadAllText(resolvedPath);
            File.WriteAllText(resolvedPath, content);
        }
    }



    [WebMethod]
    public void CompileAspNetControls()
    {
        ControlCompilerService.CompileAll();
    }



    [WebMethod]
    public void RecreatePageHooks()
    {
        UserValidationFacade.FormValidateUser("admin", "123456");

        using (new DataScope(DataScopeIdentifier.Administrated, UserSettings.ActiveLocaleCultureInfo))
        {
            HookingFacade.EnsureInitialization();
            
            Random rand = new Random();

            IPage page = DataFacade.GetData<IPage>().First();
            page.Abstract = rand.Next().ToString();
            DataFacade.Update(page);
        }
    }
    


    private int GetAllPages(ElementHandle parentHandle)
    {
        List<Element> children = ElementFacade.GetChildren(parentHandle, null).ToList();

        int total = children.Count;

        foreach (Element child in children)
        {
            total += GetAllPages(child.ElementHandle);
        }

        return total;
    }
}

