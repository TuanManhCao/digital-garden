---
title: "Hosted Confluence Installation"
canonical: "https://www.cbsofyalioglu.com/self-hosted-confluence/"
cover: "https://cbsofyalioglu.fra1.digitaloceanspaces.com/note-images/confluence-installation/confluence.jpg"
---

One of our customers ask the possibility of using Atlassian Confluence as a self-hosted wiki program. We look for solutions for a while. Later on, we discovered Cloudron app. In this article, We'll install Confluence with a custom domain on our servers. 

[[Test Linki]]
[[Zettelkasten Metodu]]

### What is Confluence?
Confluence is a team collaboration and wiki software developed by Australian software company Atlassian. 
It is a web-based application and written in Java programming language.It was released in 2004 (Voav) as an enterprise knowledge management software.

![Confluence Screenshots](https://cbsofyalioglu.fra1.digitaloceanspaces.com/note-images/confluence-installation/confluence-ss.jpg)


*==You can use it as a team collaboration app, wiki, knowledgebase, blog, intranet etc==*. 

If you read my articles written in Turkish, you realized that talented editor is a must for me in any platform I wrote. The editor of Confluence is one of the best editor in the universe. It has really advanced permission level. You can create many workspaces.

However, Atlassian Cloud doesn’t allow us to use our custom domains and managed Confluence solutions is a bit complicated.

Fortunately, Cloudron made it easier for us to use it on our own servers. By doing this, we can use our own custom domains with Atlassian Confluence app.


### How much does it cost to use Self-Hosted Confluence?

Confluence requires at least 4 GB RAM. Thus, the most expensive cost will the cloud instance.Cloudron is free for personal usage up to 2 apps which is completely sufficient for us.
Therefore, the cost of using Confluence with a custom domain will be:
* **$20/month** Cloud Cost on Digital Ocean + one-time license fee of **$10**.

I'll share a referral links below that gives you some amount of free credits. Thus, It is free to follow this guideline.

</br>


### What are the requirements?
* __Digital Ocean Account__: This is the platform that hosts our Confluence server. You can get __free $100 credit__ which is available 60 days if you register with this [referral link](https://m.do.co/c/7eab8594304f).
* __Cloudron Account__: Cloudron provides software solutions for hosting different applications on our servers. You can also get __ $30 free credit__ if you register with this [referral link](https://cloudron.io/?refcode=4c0c9d3f2a2daed6)
* __Domain Name__: You'll need a custom domain.


## Step 1 - Create Droplet with Cloudron 
Our Confluence app will be hosted on the droplet which we will create now. A Droplet is basically a virtual server in Digital Ocean. 

I'm assuming that you have created an DA account and created a project. Now, we'll create a droplet with Cloudron app installed. 

On the left side, you'll find __Marketplace__ link under the __Discover__ section. 

1. Click the marketplace link.  Search and select __Cloudron__. 
![Cloudron on Digital Ocean](https://cbsofyalioglu.fra1.digitaloceanspaces.com/note-images/confluence-installation/1-marketplace-selection.jpg)


2. Click __Create Couldron Droplet__ button. 
![Create Cloudron Droplet](https://cbsofyalioglu.fra1.digitaloceanspaces.com/note-images/confluence-installation/2-cloudron-selection.jpg)


3. Now, you'll see the droplet settings page. As I told you before, Confluence requires minimum 4 GB RAM. Therefore, we should minimum select Basic plan which costs $20/month. Also, we'll choose the closest datacenter to us and create a password as an authentication method. 
![Cloudron droplet settings](https://cbsofyalioglu.fra1.digitaloceanspaces.com/note-images/confluence-installation/3-droplet-settings.jpg)

At the bottom of the page, we'll click the __Create Droplet__ button. It will start the installation of cloud instance and Cloudron application.



## Step - 2) Initial Configurations
We are going to make some domain adjustments. There are two cases for your domain name provider. 
* The nameservers of your domain name are on Digital Ocean.
* Your nameservers are on another provider.

In either case, I'll follow the __manual method__ that fits every case. 


#### DNS Settings
First, visit the project page on Digital Ocean. If any IP number assigned to your instance, note it down. Otherwise, wait till the assignment. For example mine is `46.101.148.85`.

![droplet-ip](https://cbsofyalioglu.fra1.digitaloceanspaces.com/note-images/confluence-installation/4-droplet-ip.jpg)

To make illustration, Let say we have a domain [airporttransfer.ist](https://airporttransfer.ist). We also decided to use a subdomain for the Confluence app, let's say __notes.airporttransfer.ist__. 

Second, Whether your DNS provider is DA or not, visit your domain name provider's website. Go to DNS management page of your domain name. 
Add these two '__A records__' that target the IP number we saved above.

| Host | Target |
|------|------|
| notes | 46.101.148.85 |
| my.notes | 46.101.148.85 |

First one is the subdomain name you use with Confluence. Second one is the cloudron panel with a prefix of __my.__ 
Save the records. 

You can control whether your domain is pointing to correct IP by visiting __dnschecker.org__. If the __A record__ points to the correct IP, you can proceed. DNS propagation can take some time. Therefore, this process can took time. 

#### Cloudron settings
Open your browser and paste the IP number of your instance on a new page.

![browser-security-warning](https://cbsofyalioglu.fra1.digitaloceanspaces.com/note-images/confluence-installation/5-browser-warning.jpg)

(__Note__: We have not any secure certificate now.Therefore, your browser will warn you about the privacy. This means your connection is not encrypted end-to-end. Open the advanced settings and proceed with unsafe method.)

You'll see Cloudron setup page. 

![cloudron-domain-setup](https://cbsofyalioglu.fra1.digitaloceanspaces.com/note-images/confluence-installation/6-cloudron-domain-screen.jpg)

* Write down your domain/subdomain that will be used for Confluence app. 
* Select Manual as DNS Provider. 

Click Next. Now, Cloudron will start to make proper internal configurations. Whet it finishes, you'll fill the admin form. 


#### Confluence Installation 

If we did everyhting right, we see an empt Cloudron page.
On the upper right menu, click App Store. Before this, you fill the login form of Cloudron. 

![confluence-installed-cloudron](https://cbsofyalioglu.fra1.digitaloceanspaces.com/note-images/confluence-installation/7-start-confluence.jpg)


Write your credentials and login.
Search Confluence and install it.


## Step - 3) Confluence Settings
I assume that all the settings properly configured. Now, click Confluence app on Cloudron page. 

A setup page welcomes us. Follow the steps below:
* Select __Product Installation__. If you need __Concluence Questions__ or __Confluence Team Calendars__, please also select them. Click Next.

* Press __Get an evaluation license__ link and get the license for Confluence Server. Click Next.
* If you have a database choose __My own database__. Otherwise, you can use built-in database as a temporary solution. Click Next.
* Wait until the database settings are done. Then, create an empty site. 
* Fill the System Administrator Account.
* Give your space a name. For example: "Personal Wiki".

![confluence-empty-page](https://cbsofyalioglu.fra1.digitaloceanspaces.com/note-images/confluence-installation/8-final-screen.jpg)

Now, you can use Atlassian Confluence on your domain. You can create a redirection to your space or make your space public. Just configure them on General Configuration.




