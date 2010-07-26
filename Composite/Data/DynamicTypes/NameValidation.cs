using System;
using System.Globalization;
using Composite.ResourceSystem;
using System.Linq;


namespace Composite.Data.DynamicTypes
{
    public static class NameValidation
    {
        public static string ValidateNamespace(string namespaceString)
        {
            string errorMessage;
            if (TryValidateNamespace(namespaceString, out errorMessage) == false)
            {
                throw new ArgumentException(errorMessage);
            }

            return namespaceString;
        }



        public static bool TryValidateNamespace(string namespaceString)
        {
            string errorMessage;

            return TryValidateNamespace(namespaceString, out errorMessage);
        }



        public static bool TryValidateNamespace(string namespaceString, out string errorMessage)
        {
            errorMessage = "";

            if (string.IsNullOrEmpty(namespaceString))
            {
                errorMessage = StringResourceSystemFacade.GetString("Composite.NameValidation", "EmptyNamespace");
                return false;
            }


            string[] namespaceElements = namespaceString.Split('.');

            foreach (string namespaceElement in namespaceElements)
            {
                if (NameValidation.TryValidateName(namespaceElement, out errorMessage) == false)
                {
                    return false;
                }
            }

            if (namespaceElements.Distinct().Count() < namespaceElements.Count())
            {
                errorMessage = StringResourceSystemFacade.GetString("Composite.NameValidation", "DuplicateElementNamespace");
                return false;
            }

            return true;
        }




        /// <summary>
        /// Returns the name if all characters are valid in a type and field name. Invalid characters generate an exception.
        /// </summary>
        /// <param name="name">The name to validate</param>
        /// <returns>The name that was validated</returns>
        public static string ValidateName(string name)
        {
            string errorMessage;

            if (TryValidateName(name, out errorMessage) == false)
            {
                throw new ArgumentException(errorMessage);
            }

            return name;
        }



        public static bool TryValidateName(string name)
        {
            string errorMessage;

            return TryValidateName(name, out errorMessage);
        }



        public static bool TryValidateName(string name, out string errorMessage)
        {
            errorMessage = "";

            if (string.IsNullOrEmpty(name))
            {
                errorMessage = StringResourceSystemFacade.GetString("Composite.NameValidation", "EmptyName");
                return false;
            }

            for (int i = 0; i < name.Length; i++)
            {
                char ch = name[i];
                UnicodeCategory uc = Char.GetUnicodeCategory(ch);

                if (ch > 127)
                {
                    errorMessage = string.Format(StringResourceSystemFacade.GetString("Composite.NameValidation", "InvalidIdentifier"), name);
                    return false;
                }

                if (i == 0 && uc == UnicodeCategory.DecimalDigitNumber)
                {
                    errorMessage = string.Format(StringResourceSystemFacade.GetString("Composite.NameValidation", "InvalidIdentifierDigit"), name);
                    return false;
                }

                switch (uc)
                {
                    case UnicodeCategory.UppercaseLetter:
                    case UnicodeCategory.LowercaseLetter:
                    case UnicodeCategory.TitlecaseLetter:
                    case UnicodeCategory.DecimalDigitNumber:
                        break;
                    default:
                        if (ch == 95)
                            break;

                        errorMessage = string.Format(StringResourceSystemFacade.GetString("Composite.NameValidation", "InvalidIdentifier"), name);
                        return false;
                }
            }

            return true;
        }
    }
}
