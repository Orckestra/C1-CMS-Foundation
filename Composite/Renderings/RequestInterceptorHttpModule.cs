using System;
using System.Collections.Specialized;
using System.Web;
using Composite.Threading;
using Composite.WebClient;

using Composite.Extensions;


namespace Composite.Renderings
{
    public class RequestInterceptorHttpModule : IHttpModule
    {
        public void Init(HttpApplication context)
        {
            context.BeginRequest += context_BeginRequest;
        }

        void context_BeginRequest(object sender, EventArgs e)
        {
            ThreadDataManager.InitializeThroughHttpContext(true);

            HttpApplication application = (HttpApplication) sender;
            HttpContext context = application.Context;

            if(HandlePublicPageUrl(context))
            {
                return;
            }

            HandleFriendlyUrl(context);
        }



        private static bool HandlePublicPageUrl(HttpContext context)
        {
            try
            {
                if (!PageUrlHelper.IsPublicUrl(context.Request.Path))
                {
                    return false;
                }

                string currentUrl = context.Request.Url.OriginalString;

                NameValueCollection notInvolvedQueryParameters;
                PageUrlOptions urlOptions = PageUrlHelper.ParsePublicUrl(currentUrl, out notInvolvedQueryParameters);

                if (urlOptions == null)
                {
                    return false;
                }

                UrlString originalUrlString = new UrlString(context.Request.Path);

                UrlString correctUrl = PageUrlHelper.BuildUrl(urlOptions);



                if (string.Compare(originalUrlString.FilePath, correctUrl.FilePath, false) != 0 &&
                    string.Compare(originalUrlString.FilePath, correctUrl.FilePath, true) == 0)
                {
                    // redirect to right case
                    correctUrl.AddQueryParameters(notInvolvedQueryParameters);
                    correctUrl.PathInfo = originalUrlString.PathInfo;

                    SEOFriednlyRedirect(context, correctUrl.ToString());
                    return true;
                }



                UrlString internalPageUrl = PageUrlHelper.BuildUrl(UrlType.Internal, urlOptions);

                internalPageUrl.AddQueryParameters(notInvolvedQueryParameters);

                context.RewritePath(internalPageUrl.FilePath, context.Request.PathInfo, internalPageUrl.QueryString);

                if (Composite.Security.UserValidationFacade.IsLoggedIn() == true)
                {
                    context.Response.Cache.SetCacheability(HttpCacheability.NoCache);
                }

                return true;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException(string.Format("Failed to intercept URL '{0}'.",context.Request.Url.OriginalString), ex);
            }
        }

        private static bool HandleFriendlyUrl(HttpContext context)
        {
            PageUrlOptions urlOptions;
            Uri requestUrl = context.Request.Url;

            if (!PageUrlHelper.TryParseFriendlyUrl(requestUrl.LocalPath, out urlOptions))
            {
                return false;
            }
            //// Renreding page directly to response 
            //UrlString internalPageUrl1 = PageUrlHelper.BuildUrl(UrlType.Public, urlOptions);


            //string newQueryString = internalPageUrl1.QueryString;
            //if (!requestUrl.Query.IsNullOrEmpty())
            //{
            //    if(!newQueryString.IsNullOrEmpty())
            //    {
            //        newQueryString += "&";
            //    }
            //    newQueryString += RemoveLeadingQuestionMark(requestUrl.Query);
            //}

            // context.RewritePath(internalPageUrl1.FilePath, null, newQueryString);


            UrlString defaultPageUrl = PageUrlHelper.BuildUrl(UrlType.Public, urlOptions);
            if(defaultPageUrl == null)
            {
                return false;
            }

            var parameters = new UrlString(requestUrl.ToString()).GetQueryParameters();
            defaultPageUrl.AddQueryParameters(parameters);

            SEOFriednlyRedirect(context, defaultPageUrl.ToString());
            return true;
        }

        //static string RemoveLeadingQuestionMark(string str)
        //{
        //    if(str.StartsWith("?"))
        //    {
        //        return str.Substring(1);
        //    }
        //    return str;
        //}

        public void Dispose()
        {
        }

        private static void SEOFriednlyRedirect(HttpContext context, string url)
        {
            context.Response.AddHeader("Location", url);
            context.Response.StatusCode = 301; // Http 301 - Permanently moved
            context.ApplicationInstance.CompleteRequest();
        }
    }
}
