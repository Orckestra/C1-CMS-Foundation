using System.Collections.Generic;
using System.Text;
using Composite.PackageSystem;


namespace Composite.StandardPlugins.Elements.ElementProviders.PackageElementProvider
{
	internal static class WorkflowHelper
	{
        public static object ValidationResultToBinding(List<PackageFragmentValidationResult> packageFragmentValidationResults)
        {
            List<List<string>> rows = new List<List<string>>();
            
            foreach (PackageFragmentValidationResult packageFragmentValidationResult in packageFragmentValidationResults)
            {
                StringBuilder sb = new StringBuilder();

                if (packageFragmentValidationResult.XPath != null)
                {
                    sb.AppendLine(packageFragmentValidationResult.Message);
                    sb.Append("XPath: ");
                    sb.Append(packageFragmentValidationResult.XPath);
                }
                else
                {
                    sb.Append(packageFragmentValidationResult.Message);
                }

                List<string> row = new List<string>();
                row.Add(sb.ToString());

                rows.Add(row);
            }

            return rows;
        }
	}
}
