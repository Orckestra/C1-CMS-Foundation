using Composite.ResourceSystem;


namespace Composite.Trees
{
    internal sealed class ValidationError
    {
        public static ValidationError Create(string xPath, string stringName, params object[] args)
        {
            string resourceString;

            try 
            {
                resourceString = StringResourceSystemFacade.GetString("Composite.Trees", stringName);
            }
            catch
            {
                resourceString = string.Format("STRING RESOURCE NAMED '{0}' NOT FOUND", stringName);
            }

            return new ValidationError(xPath, string.Format(resourceString, args));
        }

        public ValidationError(string xPath, string message)
        {
            this.XPath = xPath;
            this.Message = message;
        }


        public string XPath { get; set; }
        public string Message { get; set; }
    }
}
