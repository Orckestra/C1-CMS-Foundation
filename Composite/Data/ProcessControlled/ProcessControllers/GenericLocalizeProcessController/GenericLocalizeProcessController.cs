using System;
using System.Collections.Generic;
using Composite.C1Console.Elements;
using Composite.C1Console.Users;
using System.Globalization;
using Composite.C1Console.Security;


namespace Composite.Data.ProcessControlled.ProcessControllers.GenericLocalizeProcessController
{
	internal sealed class GenericLocalizeProcessController : ILocalizeProcessController
	{
        public bool OnAfterBuildNew(IData data)
        {
            ILocalizedControlled localizedData = data as ILocalizedControlled;
            if (localizedData != null)
            {
                if (!LocalizationScopeManager.IsEmpty)
                {
                    localizedData.SourceCultureName = LocalizationScopeManager.CurrentLocalizationScope.Name;
                }
                else
                {
                    CultureInfo cultureInfo = null;

                    if (UserValidationFacade.IsLoggedIn())
                    {
                        cultureInfo = UserSettings.ActiveLocaleCultureInfo;
                    }

                    if (cultureInfo == null)
                    {
                        cultureInfo = DataLocalizationFacade.DefaultLocalizationCulture;
                    }

                    if (cultureInfo != null)
                    {
                        localizedData.SourceCultureName = cultureInfo.Name;
                    }
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
