using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Elements;
using Composite.Users;
using System.Globalization;
using Composite.Security;


namespace Composite.Data.ProcessControlled.ProcessControllers.GenericLocalizeProcessController
{
	internal sealed class GenericLocalizeProcessController : ILocalizeProcessController
	{
        public bool OnAfterBuildNew(IData data)
        {
            ILocalizedControlled localizedData = data as ILocalizedControlled;
            if (localizedData != null)
            {
                CultureInfo cultureInfo = null;

                if (UserValidationFacade.IsLoggedIn() == true)
                {
                    cultureInfo = UserSettings.ActiveLocaleCultureInfo;
                }

                if (cultureInfo == null)
                {
                    cultureInfo = DataLocalizationFacade.DefaultLocalizationCulture;
                }

                if (cultureInfo != null)
                {
                    localizedData.CultureName = cultureInfo.Name;
                    localizedData.SourceCultureName = cultureInfo.Name;
                }
            }

            return false;
        }



        public List<ElementAction> GetActions(IData data, Type elementProviderType)
        {
            // TODO: Add Localize action here?????
            return new List<ElementAction>();
        }
    }
}
