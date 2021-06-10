package com.epitech.mobilearea.ui.home

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.epitech.mobilearea.Areaction
import kotlinx.android.synthetic.main.reaction_view.view.*
import com.epitech.mobilearea.R
import com.epitech.mobilearea.action

class HomeFragmentAdapter(private val list: ArrayList<Areaction>) :
    RecyclerView.Adapter<HomeFragmentAdapter.HomeFragmentViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): HomeFragmentViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.reaction_view, parent, false)
        return HomeFragmentViewHolder(view)
    }

    override fun getItemCount(): Int = list.size

    override fun onBindViewHolder(holder: HomeFragmentViewHolder, position: Int) {
        holder.view.action.text = list[position].action
        holder.view.reaction.text = list[position].reaction
        var action1 = list[position].action.split("\\s".toRegex())[0];
        var reaction1 = list[position].reaction.split("\\s".toRegex())[0];

        if (action1 == "Github") {
            holder.view.image_view.setImageResource(R.drawable.ic_github);
        } else if (action1 == "Movie") {
            holder.view.image_view.setImageResource(R.drawable.ic_movie);
        } else if (action1 == "Ytube") {
            holder.view.image_view.setImageResource(R.drawable.ic_youtube);
        } else if (action1 == "Mail") {
            holder.view.image_view.setImageResource(R.drawable.ic_mail);
        } else if (action1 == "Weather") {
            holder.view.image_view.setImageResource(R.drawable.ic_weather);
        } else if (action1 == "Facebook") {
            holder.view.image_view.setImageResource(R.drawable.ic_facebook);
        } else if (action1 == "Reddit") {
            holder.view.image_view.setImageResource(R.drawable.ic_reddit);
        } else if (action1 == "Money") {
            holder.view.image_view.setImageResource(R.drawable.ic_money);
        } else {
            holder.view.image_view.setImageResource(R.drawable.ic_plu);
        }

        if (reaction1 == "Github") {
            holder.view.image_viewReaction.setImageResource(R.drawable.ic_github);
        } else if (reaction1 == "Movie") {
            holder.view.image_viewReaction.setImageResource(R.drawable.ic_movie);
        } else if (reaction1 == "Ytube") {
            holder.view.image_viewReaction.setImageResource(R.drawable.ic_youtube);
        } else if (reaction1 == "Mail") {
            holder.view.image_viewReaction.setImageResource(R.drawable.ic_mail);
        } else if (reaction1 == "Weather") {
            holder.view.image_viewReaction.setImageResource(R.drawable.ic_weather);
        } else if (reaction1 == "Facebook") {
            holder.view.image_viewReaction.setImageResource(R.drawable.ic_facebook);
        } else {
            holder.view.image_viewReaction.setImageResource(R.drawable.ic_plu);
        }
    }

    class HomeFragmentViewHolder(val view: View) : RecyclerView.ViewHolder(view)
}