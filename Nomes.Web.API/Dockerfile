# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

WORKDIR /app

COPY ./ ./

RUN dotnet publish Nomes.Web.API.csproj -c release -o /out

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /out ./

EXPOSE 80

ENTRYPOINT ["dotnet", "Nomes.Web.API.dll"]