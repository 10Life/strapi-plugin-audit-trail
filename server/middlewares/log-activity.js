'use strict';
const removePasswords = (key, value) => key === "password" ? undefined : value;

const getContentType = (path) => {
    if(path !== undefined){
        if (path.includes("service-request")) {
            return "Service Request";
        }
        if (path.includes("register")) {
            return "Account Registration";
        }
        if (path.includes("local")) {
            return "Account Login";
        }
        if (path.includes("service")) {
            return "Service";
        }
        if (path.includes("content-types") || path.includes("content-manager") || path.includes("users")) {
            return "Admin";
        }    
    }
    return "Others";
};

const getActionType = (method, path) => {
    if(path !== undefined){
        if (method === "POST" && path.includes("service-request")) {
            return "Created Service Request";
        }
        if (method === "GET" && path.includes("content-manager")) {
            return "View Content";
        }
        if (method === "POST" && path.includes("content-manager")) {
            return "Create Content";
        }
        if (method === "PUT" && path.includes("content-manager")) {
            return "Update Content";
        }
        if (method === "PUT" && path.includes("users/me")) {
            return "Profile Update";
        }
        if (method === "PUT" && path.includes("users") && !path.includes("me")) {
            return "User Update";
        }
        if (method === "POST" && path.includes("register")) {
            return "User Register";
        }
        if (method === "POST" && path.includes("login")) {
            return "User Login";
        }
        if (method === "POST" && path.includes("logout")) {
            return "User Logout";
        }
        if (method === "POST" && path.includes("users/batch-delete")) {
            return "User Delete";
        }
        if (method === "POST" && path.includes("renew-token")) {
            return "Renew Token";
        }
    }
    return "Other Activities";
};

const audit_methods = [
    "POST",
    "PUT",
    "DELETE"
  ];

const plugin_model = 'plugin::audit-trail.trail';

module.exports = (config, {strapi}) => {
    return async (ctx, next) => {
            await next();
            try {
                const url = ctx.request.url;
                const method = ctx.request.method.toUpperCase();
                const action_type = getActionType(method, url);
                if(action_type !== "Other Activities"){
                    if(method !== undefined && ctx.params.model !== plugin_model && ctx.params.uid !== plugin_model){
                        let author = {
                            id: 'not found',
                            email: 'not found'
                        };
                        if (ctx.state && ctx.state.user) {
                            author = {
                                id: ctx.state.user.id,
                                email: ctx.state.user.email
                            };
                        } 
                        let payload = {
                            contentType: getContentType(url),
                            action: action_type,
                            statusCode: ctx.response.status,
                            author: author,
                            method: method,
                            url: url,
                            params: ctx.params,
                            request: ctx.request.body,
                            content: ctx.response.body,
                        };
                        payload = JSON.parse(JSON.stringify(payload, removePasswords));
                        if (audit_methods.includes(method) === true) {
                            await strapi.query(plugin_model).create(
                                { data: payload }
                            );
                        }
                    }
                }
            } catch (error) {
                // ignore error
                strapi.log.info("Unable to audit");
            }
        };
    };
    