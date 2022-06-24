using System.Security.Claims;

namespace ShoppingCart.Helpers;

public class CurrentUser
{
    private readonly IHttpContextAccessor _http;

    public CurrentUser(IHttpContextAccessor http)
    {
        _http = http;
    }

    public string Id
    {
        get
        {
            var id = _http.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (id == null)
                return String.Empty;

            return id;
        }
    }
}