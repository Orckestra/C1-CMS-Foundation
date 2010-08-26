<%@ WebService Language="C#" Class="ServerConfig" %>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Text;
using System;
using System.Management;
using System.IO;
using System.Globalization;
using System.Xml.Linq;
using Composite.Core.Configuration;
using Composite.Data;
using Composite.Data.Types;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.C1Console.Users;
using Composite.Core.PackageSystem;
using Composite.Data.DynamicTypes;
using Composite.Core.Application;


[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
public class ServerConfig : System.Web.Services.WebService
{
    [WebMethod]
    public string Ping()
    {
        UserValidationFacade.FormValidateUser("admin", "123456");

        return "Ping";
    }


    [WebMethod]
    public void Restart()
    {
        //UserValidationFacade.FormValidateUser("admin", "123456");

        ApplicationOnlineHandlerFacade.TurnApplicationOffline(false, false);
        ApplicationOnlineHandlerFacade.TurnApplicationOnline();
    }
    
    
    
    [WebMethod]
    public void SetCores(int count)
    {
        string command = string.Format("/set numproc {0}", count);

        ProcessStartInfo bcdEditProcessStartInfo = new ProcessStartInfo("bcdedit", command);
        bcdEditProcessStartInfo.CreateNoWindow = true;
        bcdEditProcessStartInfo.UseShellExecute = false;
        bcdEditProcessStartInfo.RedirectStandardOutput = true;

        Process bcdEditProcess = Process.Start(bcdEditProcessStartInfo);
        string result = bcdEditProcess.StandardOutput.ReadToEnd();
        bcdEditProcess.WaitForExit();

        StringBuilder sb = new StringBuilder();
        sb.AppendLine(string.Format("Setting {0} cores", count));
        sb.AppendLine(result);
        EventLog.WriteEntry("C1 Configuration Services", sb.ToString(), EventLogEntryType.Information);
    }



    [WebMethod]
    public int GetCores()
    {
        return Environment.ProcessorCount;
    }



    [WebMethod]
    public void EnablePerformanceCounter()
    {
        ConfigurationServices.TransformConfiguration(
            delegate(XDocument doc)
            {
                XElement element = doc.Descendants("Composite.Core.Instrumentation.Plugin.Runtime.PerformanceCounterProviderConfiguration").Single();
                XAttribute attribute = element.Attribute("defaultPerformanceCounterProviderName");

                if (attribute.Value == "WindowsPerformanceCounterProvider") return false;

                attribute.SetValue("WindowsPerformanceCounterProvider");
                return true;                               
            }
        );
    }


    
    [WebMethod]
    public void EnableParallelization()
    {
        ConfigurationServices.TransformConfiguration(
            delegate(XDocument doc)
            {
                XElement element = doc.Descendants("Composite.Core.Parallelization.Plugins.ParallelizationProviderConfiguration").Single();
                XAttribute attribute = element.Attribute("defaultParallelizationProviderName");
                
                if (attribute.Value == "ParallelParallelizationProvider40") return false;
                                
                attribute.SetValue("ParallelParallelizationProvider40");


                XElement parallelizationProviderPluginsElement = element.Descendants("ParallelizationProviderPlugins").Single();

                bool exists =
                    (from elm in parallelizationProviderPluginsElement.Elements("add")
                     where elm.Attribute("name").Value == "ParallelParallelizationProvider40"
                     select elm).Any();

                if (exists == false)
                {
                    parallelizationProviderPluginsElement.Add(
                        new XElement("add",
                            new XAttribute("name", "ParallelParallelizationProvider40"),
                            new XAttribute("type", "C1ParallelsExtensionPlugin.ParallelParallelizationProvider, C1ParallelsExtensionPlugin")));
                }
                                
                return true;
            }
        );
    }



    [WebMethod]
    public void DisableParallelization()
    {
        ConfigurationServices.TransformConfiguration(
            delegate(XDocument doc)
            {
                XElement element = doc.Descendants("Composite.Core.Parallelization.Plugins.ParallelizationProviderConfiguration").Single();
                XAttribute attribute = element.Attribute("defaultParallelizationProviderName");

                if (attribute.Value == "SerialParallelizationProvider") return false;

                attribute.SetValue("SerialParallelizationProvider");
                return true;
            }
        );
    }


    
    [WebMethod]
    public bool VerifyInstallLanguage(string cultureName)
    {
        UserValidationFacade.FormValidateUser("admin", "123456");

        using (new DataScope(DataScopeIdentifier.Administrated))
        {
            CultureInfo cultureInfo = CultureInfo.CreateSpecificCulture(cultureName);

            bool exists =
                (from sal in DataFacade.GetData<ISystemActiveLocale>()
                 where sal.CultureName == cultureName
                 select sal).Any();

            if (exists == true) return true;

            ISystemActiveLocale systemActiveLocale = DataFacade.BuildNew<ISystemActiveLocale>();
            systemActiveLocale.Id = Guid.NewGuid();
            systemActiveLocale.CultureName = cultureName;
            systemActiveLocale.UrlMappingName = cultureName;
            DataFacade.AddNew<ISystemActiveLocale>(systemActiveLocale);

            List<string> usernames =
                (from u in DataFacade.GetData<IUser>()
                 select u.Username).ToList();

            foreach (string username in usernames)
            {
                UserSettings.AddActiveLocaleCultureInfo(username, cultureInfo);

                if (UserSettings.ActiveLocaleCultureInfo == null)
                {
                    UserSettings.ActiveLocaleCultureInfo = cultureInfo;
                    UserSettings.ForeignLocaleCultureInfo = cultureInfo;
                }
            }

            if (DataLocalizationFacade.DefaultLocalizationCulture == null)
            {
                DataLocalizationFacade.DefaultLocalizationCulture = cultureInfo;
            }

            DynamicTypeManager.AddLocale(cultureInfo);

            return true;
        }
    }

    

    [WebMethod]
    public string InstallPackage(string filename)
    {
        UserValidationFacade.FormValidateUser("admin", "123456");

        using (new DataScope(DataScopeIdentifier.Administrated, UserSettings.ActiveLocaleCultureInfo))
        {
            using (FileStream file = File.Open(filename, System.IO.FileMode.Open, FileAccess.Read))
            {
                PackageManagerInstallProcess install = PackageManager.Install(file, true);

                if (install.PreInstallValidationResult.Count != 0) return BuildErrorList(install.PreInstallValidationResult);

                List<PackageFragmentValidationResult> vResult = install.Validate();
                if (vResult.Count > 0) return BuildErrorList(vResult);

                List<PackageFragmentValidationResult> iResult = install.Install();
                if (iResult.Count > 0) return BuildErrorList(iResult);
            }

            return "";
        }
    }



    private string BuildErrorList(List<PackageFragmentValidationResult> packageFragmentValidationResults)
    {
        StringBuilder sb = new StringBuilder();
        foreach (PackageFragmentValidationResult packageFragmentValidationResult in packageFragmentValidationResults)
        {
            sb.AppendLine(packageFragmentValidationResult.Message);
        }

        return sb.ToString();
    }
}

