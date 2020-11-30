# What is Collaborative Filtering?



Briefly, Recommender Systems (RS) provide suggestions for particular items that are likely to be interested by target users. Those suggestions can be in any area that relates to decision -making processes.  
Youtube video suggestions, Spotify discover weekly and  any particular item offered to you on shopping sites that is related with the item that you bought can be result of some recommender systems.  
There are many approaches in recommenders systems considering various situations with pros and cons. Those are Content-Based, Collaborative Filtering, Knowledge-Based, Demographic and Hybrid-Systems. In this article we will only focus on collaborative filtering while considering movie recommendations.

The basic idea of collaborative filtering is lying  on analyzing people's shared interests on domain specific items (in our case,  domain items are movies ).  Calculating similarity between taste of people or similarity between different items with each other allow us to make a good  recommendations. In general, Those recommendations can be item-based and/or user-based.


On the rest of this article, to make a good illustration we will consider a hypothetical sitution that  are mainly consists of  two person; Person A and Person B and two items (movies) Movie X and Movie Y.

As we know people tends to take movie recommendations from  friends or people.
In real life, Person A  asks Person B for a good movie to watch and if movie is liked by Person A than we assume that Person A will be more likely to ask Person B for new suggestions in the future. 

In our case,  if commonly watched movies of those two person  is at least previously defined threshold quantity, let say 20 movies and their similarity of cinema taste is high enough for saying  that is positively correlated , we will consider those two person as neighbours.

After than, if some of neighbours of Person A likes a Movie X, than recommending Movie X to Person A  can be  a good suggestion. Furthermore, with enough information and a good algorithm, we can also make a plausible prediction about the future rating of Movie X that will be  given by Person A. This can be classified as User-Based Collaborative-Filtering (UB-CF). 

On atomic perspective, UB-CF firstly holds two person and compare their ratings on shared items classifying them whether they are neighbours or not. After than considers all the neighbours for an item to make whether it is recommendable to Person A or not.

On  other side, Item-Based Collaborative-Filtering IB-CF analyze and compare ratings of two movies that are given to them by common users. 

In our case, let say Movie X and Movie Y has rated by 50 different persons. Firstly, similarity between those two items are calculated. When those two items are positively correlated, this time we will say that Movie X and Movie Y are neighbour items. 

Emphasizing that these similarities are not based on the contents of two movies but based on people's realization of a movie as a whole while including their personality. 

After than, we can make a good recommendation  to people while considering their favourite movies.


#recommendation-engine #collaborative-filtering