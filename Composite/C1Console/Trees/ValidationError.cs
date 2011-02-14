using Composite.Core.ResourceSystem;


namespace Composite.C1Console.Trees
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ValidationError
    {
        /// <exclude />
        public static ValidationError Create(string xPath, string stringName, params object[] args)
        {
            string resourceString;

            try 
            {
                resourceString = StringResourceSystemFacade.GetString("Composite.C1Console.Trees", stringName);
            }
            catch
            {
                resourceString = string.Format("STRING RESOURCE NAMED '{0}' NOT FOUND", stringName);
            }

            return new ValidationError(xPath, string.Format(resourceString, args));
        }


        /// <exclude />
        public ValidationError(string xPath, string message)
        {
            this.XPath = xPath;
            this.Message = message;
        }


        /// <exclude />
        public string XPath { get; set; }

        /// <exclude />
        public string Message { get; set; }
    }
}
